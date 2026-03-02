export const initConsoleGreeting = (): void => {
  const message = "%cHi there!%cI'm looking for a Junior/Pre-Middle Creative Developer role. Check my code, and if you like what you see, let's chat!";
  
  const styles = [
    "color: #fff; font-size: 15px; font-weight: bold; background: hsl(270, 37%, 54%); padding: 5px 10px; border-radius: 10px 10px 10px 0;",
    
    "color: hsl(270, 100%, 77%); font-size: 12px; background: #222; padding: 10px; border-radius: 10px 10px 10px 0; line-height: 1.5; margin-bottom: 5px;",

    "background: #222; color: hsl(270, 100%, 77%); font-size: 12px; font-weight: bold; padding: 5px 10px; border-radius: 10px 10px 10px 0; border: 1px solid hsl(270, 48%, 62%);"
  ];

  // eslint-disable-next-line no-console
  console.log(message, styles[0], styles[1]);
  // eslint-disable-next-line no-console
  console.log("%c @koloNatalie ", styles[2]);
};