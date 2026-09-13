import childrensDay from "@/assets/work-childrens-day.jpg.asset.json";
import eid from "@/assets/work-eid.jpg.asset.json";
import epb from "@/assets/work-epb.jpg.asset.json";
import merci from "@/assets/work-merci.jpg.asset.json";
import spacedit from "@/assets/work-spacedit.jpg.asset.json";
import fybEdits from "@/assets/FYB_EDITS.mp4.asset.json";
import fashion from "@/assets/fashion_content_creation.mp4.asset.json";
import bts from "@/assets/bts_shoot.mp4.asset.json";
import reel from "@/assets/reel.mp4.asset.json";
import eventReel from "@/assets/event_highlight_reel.mp4.asset.json";

export const studioProjects = [
  { number: "01", name: "Spacedit", category: "Social campaign", src: spacedit.url },
  { number: "02", name: "Children’s Day", category: "Campaign design", src: childrensDay.url },
  { number: "03", name: "EPB Luxe", category: "Collection launch", src: epb.url },
  { number: "04", name: "Merci Luxe", category: "Fashion campaign", src: merci.url },
  { number: "05", name: "Eid Celebration", category: "Seasonal campaign", src: eid.url },
] as const;

export const studioVideos = [
  { number: "06", name: "FYB Edits", category: "Brand edit", src: fybEdits.url },
  { number: "07", name: "Fashion Content", category: "Content production", src: fashion.url },
  { number: "08", name: "Behind the Scenes", category: "Production", src: bts.url },
  { number: "09", name: "Social Reel", category: "Motion & video", src: reel.url },
  { number: "10", name: "Event Highlights", category: "Event film", src: eventReel.url },
] as const;

export const services = [
  { number: "01", name: "Brand Identity", detail: "Visual systems that give brands a distinct and consistent presence." },
  { number: "02", name: "Creative Direction", detail: "A clear visual point of view that guides every creative decision." },
  { number: "03", name: "Campaigns", detail: "Connected ideas and assets built to make a message visible." },
  { number: "04", name: "Social Media Design", detail: "Flexible content systems designed for attention and consistency." },
  { number: "05", name: "Motion & Video", detail: "Story-led edits, event films and motion made for the screen." },
  { number: "06", name: "Digital Experiences", detail: "Thoughtful digital touchpoints shaped around the brand experience." },
] as const;
