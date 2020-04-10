import React from 'react';
import './Segment.css';

function getRelated(related) {
  if (!related) return null;

  return (
    <ul>
      {
        related.map((item) => {
          return <li>{item}</li>
        })
      }
    </ul>
  );
}

function Segment(props) {
  let {
    gifUrl,
    gifCaption,
    headline,
    logoImageClass,
    logoUrl,
    logoAlt,
    companyName,
    title,
    linkWebsite,
    duration,
    className,
    responsibilities
  } = props;

  className = className ? className : "";

  return (
    <div className={`${className} segment-container d-flex align-items-center flex-column`}>
      <div className="segment-wrapper d-flex flex-column justify-content-between">
        <div className="d-flex flex-column segment-top align-items-sm-start align-items-center">
          <div className="d-flex flex-column align-items-start">
            <img
              alt={logoAlt}
              className={logoImageClass}
              src={logoUrl} />
          </div>
          <div style={{marginBottom: '25px'}} className="segment-header d-flex flex-md-row align-items-centert flex-column">
            <div className="segment-title header-2-white">{title}</div>
            <div className="body-copy-white">({duration})</div>
          </div>
          <div className="body-copy-white" style={{textAlign: "start"}}>{headline()}</div>
        </div>
        <div className="segment-bottom d-flex justify-content-between flex-md-row flex-column-reverse row">
          <div style={{textAlign: "start"}} className="col-12 col-md-6">
            <div style={{marginBottom: '25px'}} className="header-2-white">Roles & Responsibilities:</div>
            <div className="segment-projects">
              { responsibilities.map((item) => {
                let { header, technologies } = item;

                return (
                  <div>
                    <div className="body-copy-bold">
                      { header }
                    </div>
                    <ul className="body-copy-white">
                      {
                        technologies.map((item) => {
                          return (
                            <li>{item.name}{getRelated(item.related)}</li>
                          )
                        })
                      }
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="segment-gif-container d-flex flex-column col-12 col-md-6">
            <div className="d-flex flex-column align-items-center">
              <img style={{marginBottom: '10px'}} alt={gifCaption} className="segment-gif" src={gifUrl} />
              <span className="body-copy-small-white">{gifCaption}</span>
            </div>
          </div>
        </div>
      </div>
      <a target="_blank" rel="noopener noreferrer" className="body-copy-white segment-link link-color" href={linkWebsite}>Visit the {companyName} website</a>
    </div>
  );
}

export default Segment;
