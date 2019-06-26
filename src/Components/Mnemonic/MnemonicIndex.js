// import React, { useState, useEffect } from 'react';
// // import { Container, Row, Col } from 'reactstrap';
// import MnemonicPost from './MnemonicPost';
// import MnemonicGet from './MnemonicGet';
// import MnemonicEdit from './MnemonicEdit';
// import MnemonicDelete from './MnemonicDelete';

// const WorkoutIndex = (props) => {
//   const [workouts, setWorkouts] = useState([]);
//   const [updateActive, setUpdateActive] = useState(false);
//   const [workoutToUpdate, setWorkoutToUpdate] = useState({});


//   const fetchWorkouts = () => {
//     fetch('http://localhost:3000/api/log', {
//       method: 'GET',
//       headers: new Headers({
//         'Content-Type': 'application/json',
//         'Authorization': props.token
//       })
//     }).then((res) => res.json())
//       .then((logData) => {
//         setWorkouts(logData);
//         console.log(logData)
//       })
//   };

//   const editUpdateWorkout = (workout) => {
//     setWorkoutToUpdate(workout);
//     console.log(workout);
//   };

//   const updateOn = () => {
//     setUpdateActive(true);
//   };

//   const updateOff = () => {
//     setUpdateActive(false);
//   };

//   useEffect(() => {
//     fetchWorkouts();
//   }, [])

//   return (
//     <div>
//           <MnemonicPost fetchWorkouts={fetchWorkouts} token={props.token} />
         
//           <MnemonicGet workouts={workouts} editUpdateWorkout={editUpdateWorkout}
//             updateOn={updateOn} fetchWorkouts={fetchWorkouts} token={props.token} />
        
//         {updateActive ? <WorkoutEdit workoutToUpdate={workoutToUpdate}
//           updateOff={updateOff} token={props.token} fetchWorkouts={fetchWorkouts} /> : <></>}
//     </div>
//   )
// }

// export default WorkoutIndex;