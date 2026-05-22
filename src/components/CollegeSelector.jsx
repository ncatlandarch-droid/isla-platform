import React, { useState } from 'react';
import { ChevronRight, Lock, Sparkles, ArrowRight } from 'lucide-react';
import UNIVERSITY from '../config/university.js';

/**
 * CollegeSelector — EMMA-style landing page
 * Shows all colleges as cards. Click to expand → see programs.
 * Active programs launch the module. Coming-soon programs show lock.
 */
export default function CollegeSelector({ onSelectProgram }) {
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

  return (
    <div className="college-selector">
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
              Welcome to <span className="college-selector__brand">ISLA</span>
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
                <span className="college-card__icon">{college.icon}</span>
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
                  {college.programs.map(program => (
                    <button
                      key={program.id}
                      className={`program-item ${program.status === 'active' ? 'program-item--active' : 'program-item--locked'}`}
                      onClick={() => handleProgramClick(college, program)}
                      disabled={program.status !== 'active'}
                    >
                      <span className="program-item__icon">{program.icon}</span>
                      <div className="program-item__info">
                        <span className="program-item__name">{program.name}</span>
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
                  ))}
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
