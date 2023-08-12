import React from 'react';

function TotalMacros(props) {
  const { totalCalories } = props;

  // Define the SVG circle parameters
  const radius = 75;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = totalCalories / 2500;
  // const progress2 = 100 - (props.carbs / 193) * 100;
  // const progress3 = 100 - (props.fat / 87) * 100;
  // const progress4 = 100 - (props.protein / 230) * 100;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div style={{ color: 'white' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#113136',
        }}
      >
        <div
          style={{
            width: '300px',
            height: '240px',
            position: 'relative',
          }}
        >
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              marginRight: '60px',
            }}
            width="100%"
            height="100%"
            viewBox={`0 0 ${radius * 2 + strokeWidth} ${
              radius * 2 + strokeWidth
            }`}
          >
            <circle
              stroke="#baced6"
              strokeLinecap="round"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={radius}
              cx={radius + strokeWidth / 2}
              cy={radius + strokeWidth / 2}
            />
            <circle
              style={{ transition: 'stroke-dashoffset 0.5s linear' }}
              stroke="#f6fc5d"
              strokeLinecap="round"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              r={radius}
              cx={radius + strokeWidth / 2}
              cy={radius + strokeWidth / 2}
            />
          </svg>
          <div
            style={{
              position: 'absolute',
              top: '60%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                marginBottom: '5px',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              {totalCalories} / 2500
            </div>
            <p style={{ fontSize: '18px' }}>kCal</p>
          </div>
        </div>
        <div
          style={{
            width: '40%',
            maxWidth: '800px',
            padding: '10px',
            fontWeight: 'bold',
          }}
        >
          <div style={{ marginTop: '100px' }}>
            <p>{props.totalCarbs} / 193g</p>
            <div
              style={{
                background: '#ccc',
                width: '100%',

                height: '10px',
                borderRadius: '10px',
              }}
            >
              <div
                style={{
                  background: '#f6fc5d',
                  width: props.totalCarbs < 0 ? '0' : `${props.progress2}%`,
                  height: '100%',
                  borderRadius: '10px',
                  transition: 'width 0.3s ease-in-out',
                }}
              />
            </div>
            <p>Carbs</p>
          </div>
          <div>
            <p>{props.totalFat} / 87g</p>
            <div
              style={{
                background: '#ccc',
                width: '100%',

                height: '10px',
                borderRadius: '10px',
              }}
            >
              <div
                style={{
                  background: '#89c269',
                  width: props.totalFat < 0 ? '0' : `${props.progress3}%`,
                  height: '100%',
                  borderRadius: '10px',
                  transition: 'width 0.3s ease-in-out',
                }}
              />
            </div>
            <p>Fat</p>
          </div>
          <div>
            <p>{props.totalProtein} / 230g</p>
            <div
              style={{
                background: '#ccc',
                width: '100%',

                height: '10px',
                borderRadius: '10px',
              }}
            >
              <div
                style={{
                  background: '#51b8a0',
                  width: props.totalProtein < 0 ? '0' : `${props.progress4}%`,
                  height: '100%',
                  borderRadius: '10px',
                  transition: 'width 0.3s ease-in-out',
                }}
              />
            </div>
            <p>Protein</p>
          </div>
          {totalCalories <= 0 && (
            <p
              style={{ fontSize: '20px', color: '#c2272e', marginTop: '10px' }}
            >
              You don't have calories left
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TotalMacros;
