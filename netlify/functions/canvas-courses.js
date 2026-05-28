/**
 * Canvas LMS Course Fetcher
 * ═══════════════════════════════════════════════════════════════
 * Netlify serverless function — fetches a student's Canvas
 * course enrollments using their access token.
 *
 * Returns simplified course data for the frontend courseMapper.
 * Proxied through server to avoid CORS issues with Canvas API.
 */

export async function handler(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Extract access token from Authorization header
    const authHeader = event.headers.authorization || event.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Missing or invalid Authorization header' }),
      };
    }

    const accessToken = authHeader.replace('Bearer ', '');
    const CANVAS_BASE_URL = process.env.CANVAS_BASE_URL || 'https://ncat.instructure.com';

    // Fetch user's active course enrollments
    const coursesResponse = await fetch(
      `${CANVAS_BASE_URL}/api/v1/courses?enrollment_state=active&per_page=100&include[]=term`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      }
    );

    if (!coursesResponse.ok) {
      console.error('[canvas-courses] API error:', coursesResponse.status);
      return {
        statusCode: coursesResponse.status,
        headers,
        body: JSON.stringify({
          error: 'Failed to fetch Canvas courses',
          details: coursesResponse.status === 401
            ? 'Canvas token expired. Please sign in again.'
            : `Canvas API returned status ${coursesResponse.status}`,
        }),
      };
    }

    const courses = await coursesResponse.json();

    // Also fetch user profile for identity
    let userProfile = null;
    try {
      const profileRes = await fetch(`${CANVAS_BASE_URL}/api/v1/users/self/profile`, {
        headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' },
      });
      if (profileRes.ok) {
        userProfile = await profileRes.json();
      }
    } catch (e) {
      console.warn('[canvas-courses] Profile fetch failed (non-critical):', e.message);
    }

    // Simplify course data — only send what the frontend needs
    const simplifiedCourses = courses
      .filter(c => c.name && !c.access_restricted_by_date) // Filter out restricted courses
      .map(c => ({
        id: c.id,
        name: c.name,
        course_code: c.course_code || '',
        enrollment_type: c.enrollments?.[0]?.type || 'student',
        term: c.term?.name || null,
        start_at: c.start_at,
        end_at: c.end_at,
      }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        courses: simplifiedCourses,
        user: userProfile ? {
          id: userProfile.id,
          name: userProfile.name,
          email: userProfile.primary_email || userProfile.login_id,
          avatar_url: userProfile.avatar_url,
        } : null,
      }),
    };
  } catch (err) {
    console.error('[canvas-courses] Error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', message: err.message }),
    };
  }
}
