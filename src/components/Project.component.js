import React from 'react';
import './Project.css';

function Project(props) {
  let {
    tools,
    services,
    headline,
    title,
    duration
  } = props;

  return (
    <div>
      <div style={{marginBottom: '25px'}} className="d-flex flex-md-row align-items-md-center align-items-start flex-column">
        <div style={{textAlign: 'start'}} className="segment-title header-2-black">{title}</div>
        <div style={{textAlign: 'start'}} className="body-copy-black">({duration})</div>
      </div>
      <div style={{textAlign: 'start', marginBottom: '25px'}} className="body-copy-black">{headline}</div>
      <div className="row">
        <div className="col-md-6 col-12" style={{textAlign: 'start'}}>
          { services.map((item) => {
            let { services } = item;

            return (
              <div>
                <div className="body-copy-bold-black">
                  Services Include:
                </div>
                <ul className="body-copy-black">
                  {
                    services.map((item) => {
                      return (
                        <li>{item.name}</li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          })}
        </div>
        <div className="col-md-6 col-12" style={{textAlign: 'start'}}>
          { tools.map((item) => {
            let { tools } = item;

            return (
              <div>
                <div className="body-copy-bold-black">
                  Technologies used:
                </div>
                <ul className="body-copy-black">
                  {
                    tools.map((item) => {
                      return (
                        <li>{item.name}</li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Project;
