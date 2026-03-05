export type Challenge = {
  id: string;
  text: string;
  tags?: string[];
};

export const CHALLENGES: Challenge[] = [
  { id: "frog-meow", text: "Hüpf wie ein Frosch durchs Zimmer – aber miaue dabei wie eine Katze. 🐸🐱" },
  { id: "robot-compliment", text: "Sag jemandem ein Kompliment – in perfekter Roboterstimme. 🤖" },
  { id: "invisible-wall", text: "Spiel 30 Sekunden lang, du würdest gegen eine unsichtbare Wand kämpfen. 🧱" },
  { id: "dramatic-water", text: "Trink ein Glas Wasser, als wär’s der dramatischste Moment deines Lebens. 🎭" },
  { id: "spoon-mic", text: "Halte einen Löffel wie ein Mikro und sing 10 Sekunden irgendeinen Quatsch. 🎤🥄" },
  { id: "slowmo-highfive", text: "Gib jemandem (oder der Luft) einen High-Five in Zeitlupe. ✋🐢" },
  { id: "pirate-weather", text: "Sag den heutigen Wetterbericht wie ein Pirat. 🏴‍☠️" },
  { id: "chair-dj", text: "Mach 20 Sekunden DJ – aber nur mit Stuhl-Geräuschen. 🎛️🪑" },
];
