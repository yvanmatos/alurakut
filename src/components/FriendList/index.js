// import React, { useEffect, useState } from "react";
// import GitHubService from "../../api";
// import FriendItem from "../FriendItem";

// export default function FriendList({ quantidade, randomico }) {
//   const [friends, setFriends] = useState([]);
//   const friendsBox = friends.slice(0, 6);


//   useEffect(() => {
//     GitHubService.getFollowers(quantidade, randomico).then((friendsList) =>
//       setFriends(friendsList)
//     );
//   }, []);

//   return (
//     <>
//       <h2 className="smallTitle">
//         Seguidevs ({ friends.length })
//       </h2>
//       <ul>
//         {friendsBox.map((friend) => {
//           return (
//             <FriendItem
//               key={friend.login}
//               html_url={friend.html_url}
//               login={friend.login}
//               avatar_url={friend.avatar_url}
//             />
//           );
//         })}
//       </ul>
//     </>
//   );
// }