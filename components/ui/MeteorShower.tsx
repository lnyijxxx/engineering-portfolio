const meteors = [
  { top: "-8%", left: "108%", delay: "0s", duration: "13s", size: "150px" },
  { top: "4%", left: "116%", delay: ".22s", duration: "13s", size: "105px" },
  { top: "-2%", left: "128%", delay: ".48s", duration: "13s", size: "76px" },
  { top: "14%", left: "136%", delay: ".72s", duration: "13s", size: "118px" },
  { top: "7%", left: "112%", delay: "6.4s", duration: "13s", size: "132px" },
  { top: "-10%", left: "124%", delay: "6.68s", duration: "13s", size: "90px" },
  { top: "18%", left: "134%", delay: "6.92s", duration: "13s", size: "112px" },
];

export function MeteorShower() {
  return <div className="meteor-field" aria-hidden="true">
    {meteors.map((meteor, index) => <span key={index} style={{
      top: meteor.top, left: meteor.left, animationDelay: meteor.delay,
      animationDuration: meteor.duration, width: meteor.size,
    }} />)}
  </div>;
}
