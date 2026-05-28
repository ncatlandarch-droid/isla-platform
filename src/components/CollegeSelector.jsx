import React, { useState } from 'react';
import { ChevronRight, Lock, Sparkles, ArrowRight, MonitorSmartphone } from 'lucide-react';
import UNIVERSITY from '../config/university.js';

/**
 * CollegeSelector — EMMA-style landing page
 * Shows all colleges as cards. Click to expand → see programs.
 * Active programs launch the module. Coming-soon programs show lock.
 *
 * Canvas Integration: When canvasEnrollments is provided, shows a
 * "Your Canvas Courses" section at the top with auto-detected modules.
 */
export default function CollegeSelector({ onSelectProgram, canvasEnrollments = [] }) {
  const [expandedCollege, setExpandedCollege] = useState(null);

  const handleCollegeClick = (collegeId) => {
    setExpandedCollege(expandedCollege === collegeId ? null : collegeId);
  };

  const handleProgramClick = (college, program) => {
    if (program.status === 'active') {
      onSelectProgram(college, program);
    }
  };

  const activeCount = UNIVERSITY.colleges.reduce(
    (sum, c) => sum + c.programs.filter(p => p.status === 'active').length, 0
  );
  const totalPrograms = UNIVERSITY.colleges.reduce(
    (sum, c) => sum + c.programs.length, 0
  );

  // Find Canvas-enrolled programs across all colleges
  const canvasPrograms = [];
  if (canvasEnrollments.length > 0) {
    for (const college of UNIVERSITY.colleges) {
      for (const program of college.programs) {
        if (program.status === 'active' && canvasEnrollments.includes(program.id)) {
          canvasPrograms.push({ college, program });
        }
      }
    }
  }

  return (
    <div className="college-selector">
      {/* Canvas Auto-Detected Courses */}
      {canvasPrograms.length > 0 && (
        <div className="college-selector__canvas-section">
          <div className="college-selector__canvas-header">
            <MonitorSmartphone size={22} />
            <div>
              <h3 className="college-selector__canvas-title">Your Canvas Courses</h3>
              <p className="college-selector__canvas-desc">
                Detected {canvasPrograms.length} exam module{canvasPrograms.length !== 1 ? 's' : ''} from your NC A&T Canvas enrollment.
              </p>
            </div>
          </div>
          <div className="college-selector__canvas-grid">
            {canvasPrograms.map(({ college, program }) => (
              <button
                key={program.id}
                className="canvas-program-card"
                onClick={() => handleProgramClick(college, program)}
              >
                <span className="canvas-program-card__badge">
                  <MonitorSmartphone size={10} /> Canvas
                </span>
                <span className="canvas-program-card__icon">{program.icon}</span>
                <span className="canvas-program-card__name">{program.name}</span>
                <span className="canvas-program-card__exam">{program.exam}</span>
                <span className="canvas-program-card__go">
                  Start Prep <ArrowRight size={14} />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hero welcome */}
      <div className="college-selector__hero">
        <div className="college-selector__hero-content">
          <img
            src={UNIVERSITY.mascot.avatar}
            alt={UNIVERSITY.mascot.name}
            className="college-selector__mascot"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div>
            <h2 className="college-selector__welcome">
              {canvasPrograms.length > 0 ? 'Or explore all programs' : (
                <>Welcome to <span className="college-selector__brand">ISLA</span></>
              )}
            </h2>
            <p className="college-selector__desc">
              Select your college to find your licensure exam prep module.
              {activeCount} active module{activeCount !== 1 ? 's' : ''} across {totalPrograms} programs.
            </p>
          </div>
        </div>
      </div>

      {/* College grid */}
      <div className="college-grid">
        {UNIVERSITY.colleges.map(college => {
          const isExpanded = expandedCollege === college.id;
          const activePrograms = college.programs.filter(p => p.status === 'active');
          const hasActive = activePrograms.length > 0;

          return (
            <div
              key={college.id}
              className={`college-card ${isExpanded ? 'college-card--expanded' : ''} ${hasActive ? 'college-card--has-active' : ''}`}
              style={{ '--college-color': college.color }}
            >
              {/* College header */}
              <button
                className="college-card__header"
                onClick={() => handleCollegeClick(college.id)}
              >
                <img src={college.icon} alt={college.shortName} className="college-card__icon-img" />
                <div className="college-card__info">
                  <span className="college-card__name">{college.shortName}</span>
                  <span className="college-card__fullname">{college.name}</span>
                </div>
                <div className="college-card__meta">
                  <span className="college-card__count">
                    {college.programs.length} program{college.programs.length !== 1 ? 's' : ''}
                  </span>
                  {hasActive && (
                    <span className="college-card__active-badge">
                      <Sparkles size={10} /> {activePrograms.length} Active
                    </span>
                  )}
                  <ChevronRight
                    size={16}
                    className={`college-card__chevron ${isExpanded ? 'college-card__chevron--open' : ''}`}
                  />
                </div>
              </button>

              {/* Program list (expanded) */}
              {isExpanded && (
                <div className="college-card__programs">
                  {college.programs.map(program => {
                    const isCanvasEnrolled = canvasEnrollments.includes(program.id);
                    return (
                      <button
                        key={program.id}
                        className={`program-item ${program.status === 'active' ? 'program-item--active' : 'program-item--locked'} ${isCanvasEnrolled ? 'program-item--canvas' : ''}`}
                        onClick={() => handleProgramClick(college, program)}
                        disabled={program.status !== 'active'}
                      >
                        <span className="program-item__icon">{program.icon}</span>
                        <div className="program-item__info">
                          <span className="program-item__name">
                            {program.name}
                            {isCanvasEnrolled && (
                              <span className="program-item__canvas-badge">
                                <MonitorSmartphone size={10} /> Canvas
                              </span>
                            )}
                          </span>
                          <span className="program-item__degree">{program.degree}</span>
                        </div>
                        {program.exam && (
                          <span className="program-item__exam">{program.exam}</span>
                        )}
                        {program.status === 'active' ? (
                          <span className="program-item__go">
                            Start Prep <ArrowRight size={14} />
                          </span>
                        ) : (
                          <span className="program-item__lock">
                            <Lock size={12} /> Coming Soon
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="college-selector__footer">
        🏝️ ISLA — Interactive Study & Licensure Assistant · {UNIVERSITY.shortName} · © 2026
      </p>
    </div>
  );
}

