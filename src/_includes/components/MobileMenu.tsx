import { withIsland } from "../helpers/islands.tsx";
import { IconButton } from "./IconButton.tsx";
import { Menu } from "./Icons.tsx";

// function initFalling(ball: HTMLElement) {
//   const ballHeight = 100;
//   const acceleration = 9.8 / 60;
//   const { innerHeight } = window;
//   let fallingSpeed = 0;
//   const animateFall = () => {
//     const top = parseInt(ball.style.top);
//     const newTop = `${top + fallingSpeed}px`;
//     /* To break the fall, when the ball is near the surface */
//     if (parseInt(newTop) >= innerHeight - ballHeight) {
//       ball.style.top = this.innerHeight - ballHeight + "px";
//       ball.style.background = "red";
//       return null;
//     }
//
//     /* Else set the top to the new value */
//     ball.style.top = newTop;
//     fallingSpeed = fallingSpeed + acceleration;
//     requestAnimationFrame(animateFall);
//   };
//   requestAnimationFrame(animateFall);
// }

function MobileMenu() {
  return (
    <IconButton rounded className="text-2xl">
      <Menu />
    </IconButton>
  );
}

export default withIsland(MobileMenu, "MobileMenu");
