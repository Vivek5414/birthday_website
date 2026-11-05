import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type Dispatch,
  type RefObject,
  type SetStateAction,
  type TouchEvent,
} from "react";
import { createPortal } from "react-dom";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Baby,
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  CircleAlert,
  Clock3,
  ExternalLink,
  Eye,
  Gift,
  Heart,
  Images,
  ImagePlus,
  LayoutDashboard,
  Leaf,
  Maximize,
  MapPin,
  Menu,
  Mic,
  MessageCircle,
  Pause,
  Play,
  Plus,
  Radio,
  RotateCcw,
  Save,
  Share2,
  Send,
  Sparkles,
  Settings,
  Trash2,
  UsersRound,
  Utensils,
  X,
} from "lucide-react";

type SafariAnimal = "elephant" | "lion" | "giraffe";
type JungleAnimal = SafariAnimal | "monkey" | "zebra" | "toucan";
type GalleryFormat = "portrait" | "landscape" | "square";
type GiftCategory =
  | "Toys"
  | "Books"
  | "Clothing"
  | "Learning & Development"
  | "Keepsakes"
  | "Surprise Gifts";
type StreamingPlatform =
  | "YouTube Live"
  | "Facebook Live"
  | "Zoom"
  | "Google Meet";
type StreamingStatus = "upcoming" | "live" | "completed" | "not-configured";
type AdminSectionKey =
  | "celebration"
  | "story"
  | "safariTrail"
  | "countdown"
  | "location"
  | "gallery"
  | "surprise"
  | "gifts"
  | "streaming"
  | "rsvp"
  | "footer";

type InvitationSettings = {
  sectionVisibility: Record<AdminSectionKey, boolean>;
  animationsEnabled: boolean;
  welcomeScreenEnabled: boolean;
};

type GalleryMemory = {
  id: string;
  order: number;
  src: string;
  fallbackSrc: string;
  srcSet: string;
  sourceUrl: string;
  sourceLabel: string;
  alt: string;
  caption: string;
  date: string;
  format: GalleryFormat;
};

type Milestone = {
  title: string;
  date: string;
  description: string;
  companion: JungleAnimal;
};

type GiftSuggestion = {
  id: string;
  category: GiftCategory;
  title: string;
  description: string;
  visible: boolean;
  imageUrl: string;
  fallbackImageUrl?: string;
  imageAlt: string;
  imageSourceUrl: string;
  secondaryImageUrl?: string;
  fallbackSecondaryImageUrl?: string;
  secondaryImageAlt?: string;
  secondaryImageSourceUrl?: string;
  imageSourceLabel: string;
  secondaryImageSourceLabel?: string;
  productUrl: string;
};

type EventInformation = {
  baby: {
    name: string;
    age: string;
    introduction: string;
    birthDate: string;
    heroPhotoUrl: string;
    heroPhotoAlt: string;
    heroPhotoFallbackUrl: string;
    storyPhotoUrl: string;
    storyPhotoSrcSet: string;
    storyPhotoAlt: string;
    storyPhotoFallbackUrl: string;
    storyPhotoCaption: string;
    storyPhotoSourceUrl: string;
    storyPhotoSourceLabel: string;
    parentsMessage: string;
    parentsNames: string;
  };
  celebration: {
    dateISO: string;
    timeZone: string;
    startTime24: string;
    endTime24: string;
    venue: string;
    address: string;
    cityPostal: string;
    coordinates: string;
    mapsUrl: string;
    venuePhotoUrl: string;
    venuePhotoFallbackUrl: string;
    dressCode: string;
    demoNotice: string;
  };
  content: {
    heroHeading: string;
    heroEyebrow: string;
    heroIntroduction: string;
    metaDescription: string;
    celebrationHeading: string;
    celebrationMessage: string;
    storyHeading: string;
    storyIntroduction: string;
    countdownHeading: string;
    countdownIntroduction: string;
    locationHeading: string;
    locationIntroduction: string;
    locationNote: string;
    galleryHeading: string;
    galleryIntroduction: string;
    galleryDemoNotice: string;
    rsvpHeading: string;
    rsvpIntroduction: string;
    giftHeading: string;
    giftIntroduction: string;
    giftOptionalMessage: string;
    giftEmptyMessage: string;
    streamHeading: string;
    streamIntroduction: string;
    surpriseIntroductionHeading: string;
    surpriseIntroduction: string;
    rsvpAsideHeading: string;
    rsvpAsideIntroduction: string;
    footerHeading: string;
    footerIntroduction: string;
    footerThankYou: string;
  };
  milestones: Milestone[];
  gallery: GalleryMemory[];
  surprise: {
    heading: string;
    message: string;
  };
  gifts: {
    registryUrl: string;
    suggestions: GiftSuggestion[];
  };
  streaming: {
    platform: StreamingPlatform;
    streamingUrl: string;
    scheduledDateISO: string;
    scheduledTime24: string;
    timeZone: string;
    embeddedVideoUrl: string;
    recordingUrl: string;
    status: StreamingStatus;
  };
  sharing: {
    whatsappNumber: string;
    contactEmail: string;
  };
  guestManagement: {
    invitedResponseCount: number;
  };
  invitation: InvitationSettings;
};

const defaultEventInfo: EventInformation = {
  baby: {
    name: "Aarav Sharma",
    age: "Birthday Celebration",
    introduction:
      "With hearts full of joy, we invite you to celebrate {babyName}'s {birthdayAge}.\n\nJoin us for a beautiful evening filled with laughter, love, delightful moments and a little jungle adventure.\n\nYour presence will make this special milestone even more memorable.",
    birthDate: "",
    heroPhotoUrl: "",
    heroPhotoAlt: "",
    heroPhotoFallbackUrl: "",
    storyPhotoUrl:
      "https://images.pexels.com/photos/12996103/pexels-photo-12996103.jpeg?auto=compress&cs=tinysrgb&w=900&fm=webp",
    storyPhotoSrcSet:
      "https://images.pexels.com/photos/12996103/pexels-photo-12996103.jpeg?auto=compress&cs=tinysrgb&w=480&fm=webp 480w, https://images.pexels.com/photos/12996103/pexels-photo-12996103.jpeg?auto=compress&cs=tinysrgb&w=960&fm=webp 960w",
    storyPhotoAlt:
      "Illustrative stock photo of a baby in a safari outfit; not a photograph of {babyName}.",
    storyPhotoFallbackUrl: "",
    storyPhotoCaption: "Illustrative demo photograph",
    storyPhotoSourceUrl:
      "https://www.pexels.com/photo/a-cute-child-in-a-safari-guide-costume-12996103/",
    storyPhotoSourceLabel: "Pexels source",
    parentsMessage:
      "Our little one has filled our lives with countless smiles and precious memories. As we celebrate this wonderful milestone, we would love to share this happiness with our family and friends.\n\nCome celebrate, make memories and be part of {babyName}'s {birthdayAge} adventure!",
    parentsNames: "Mr. and Mrs. Sharma",
  },
  celebration: {
    dateISO: "2026-11-15",
    timeZone: "Asia/Kolkata",
    startTime24: "17:30",
    endTime24: "20:30",
    venue: "The Garden Celebration Lawn",
    address: "Jaipur, Rajasthan, India",
    cityPostal: "",
    coordinates: "",
    mapsUrl: "",
    venuePhotoUrl: "",
    venuePhotoFallbackUrl: "",
    dressCode: "Safari Chic — Earthy and Pastel Shades",
    demoNotice:
      "DEMO VENUE AND ADDRESS — replace before publishing. This is not a verified real-world location.",
  },
  content: {
    heroHeading: "{babyName}'s {birthdayAge} Adventure",
    heroEyebrow: "Celebrating {babyName}'s {birthdayAge}",
    heroIntroduction:
      "Little wonders, endless smiles and memories to treasure. Join us for a joyful celebration in the wild!",
    metaDescription:
      "Join {babyName}'s {birthdayAge} adventure with this enchanted jungle safari celebration invitation.",
    celebrationHeading: "{babyName}'s {birthdayAge} in the Garden",
    celebrationMessage:
      "Join us for a beautiful evening filled with laughter, love, delightful moments and a little jungle adventure.",
    storyHeading: "{babyName}'s Story so Far",
    storyIntroduction:
      "Tiny milestones, endless smiles and unforgettable memories. Every day brings something beautiful into our lives.",
    countdownHeading: "The Big Adventure Is Almost Here!",
    countdownIntroduction:
      "Little moments, big excitement. We're counting down to a day filled with love, laughter and unforgettable memories.",
    locationHeading: "Find Your Way to the Celebration",
    locationIntroduction:
      "Our little adventure has a special destination. We can't wait to welcome you!",
    locationNote: "We can’t wait to welcome you to this special gathering.",
    galleryHeading: "Little Moments, Forever Memories",
    galleryIntroduction:
      "Every smile, every little step, every precious moment — a beautiful collection of memories from {babyName}'s life.",
    galleryDemoNotice:
      "Illustrative stock photographs from Pexels — these are not photographs of {babyName}. Replace them with family photos before publishing.",
    rsvpHeading: "Will You Join Our Little Adventure?",
    rsvpIntroduction:
      "{babyName} would be delighted to celebrate this special milestone with you. Let us know if you can join us for a memorable day filled with love, laughter and jungle adventures.",
    giftHeading: "Little Gifts, Big Jungle Love",
    giftIntroduction:
      "Your presence is our greatest gift, but if you wish to bring something special for {babyName}, here are a few ideas chosen with love.",
    giftOptionalMessage:
      "Your presence is the greatest present. Gifts are entirely optional.",
    giftEmptyMessage:
      "Your presence is the greatest present. Gifts are entirely optional.",
    streamHeading: "Join {babyName}'s Celebration From Anywhere",
    streamIntroduction:
      "Can't join us in person? No worries! Be part of {babyName}'s special day through our live celebration.",
    surpriseIntroductionHeading: "There’s a Little Surprise Waiting!",
    surpriseIntroduction:
      "Every little explorer deserves a little magic. Open this special gift to discover something made with love.",
    rsvpAsideHeading: "Every Little Hello Makes Our Day.",
    rsvpAsideIntroduction:
      "We're counting the days until we can celebrate together. Thank you for being part of our little one's special journey.",
    footerHeading: "Until We Meet Under the Jungle Sky!",
    footerIntroduction:
      "Thank you for being part of {babyName}'s journey. Your presence will make this celebration even more special.",
    footerThankYou: "With love and gratitude.",
  },
  milestones: [
    {
      title: "The Day We Met You",
      date: "[Add date]",
      description: "[Add a family memory from the day {babyName} was born.]",
      companion: "elephant",
    },
    {
      title: "A Joyful Little Smile",
      date: "[Add date]",
      description: "[Add the date and a memory of {babyName}'s joyful smile.]",
      companion: "lion",
    },
    {
      title: "Tiny Steps and Big Discoveries",
      date: "[Add date]",
      description: "[Add a date and a favorite little discovery.]",
      companion: "giraffe",
    },
    {
      title: "A Family Adventure",
      date: "[Add date]",
      description: "[Add the date and a family adventure to remember.]",
      companion: "monkey",
    },
    {
      title: "Growing Into Our Little Explorer",
      date: "[Add date]",
      description: "[Add a favorite memory from {babyName}'s life so far.]",
      companion: "zebra",
    },
    {
      title: "Another Wonderful Birthday!",
      date: "",
      description: "[Add a birthday wish for {babyName}'s next adventure.]",
      companion: "lion",
    },
  ],
  gallery: [
    {
      id: "little-safari-explorer",
      order: 1,
      src: "https://images.pexels.com/photos/12996089/pexels-photo-12996089.jpeg?auto=compress&cs=tinysrgb&w=900&fm=webp",
      fallbackSrc: "",
      srcSet:
        "https://images.pexels.com/photos/12996089/pexels-photo-12996089.jpeg?auto=compress&cs=tinysrgb&w=480&fm=webp 480w, https://images.pexels.com/photos/12996089/pexels-photo-12996089.jpeg?auto=compress&cs=tinysrgb&w=960&fm=webp 960w",
      sourceUrl:
        "https://www.pexels.com/photo/small-boy-wearing-safari-clothing-sitting-on-a-floor-12996089/",
      sourceLabel: "Pexels source",
      alt: "Illustrative stock photo of a baby in a safari outfit with balloons; not a photograph of {babyName}.",
      caption: "A little explorer in the making",
      date: "",
      format: "portrait",
    },
    {
      id: "garden-birthday",
      order: 2,
      src: "https://images.pexels.com/photos/18358476/pexels-photo-18358476.jpeg?auto=compress&cs=tinysrgb&w=1100&fm=webp",
      fallbackSrc: "",
      srcSet:
        "https://images.pexels.com/photos/18358476/pexels-photo-18358476.jpeg?auto=compress&cs=tinysrgb&w=600&fm=webp 600w, https://images.pexels.com/photos/18358476/pexels-photo-18358476.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp 1200w",
      sourceUrl:
        "https://www.pexels.com/photo/boy-sitting-near-tent-and-pillow-in-garden-18358476/",
      sourceLabel: "Pexels source",
      alt: "Illustrative stock photo of a baby at a garden birthday celebration; not a photograph of {babyName}.",
      caption: "A birthday beneath the garden trees",
      date: "",
      format: "landscape",
    },
    {
      id: "family-birthday",
      order: 3,
      src: "https://images.pexels.com/photos/19962115/pexels-photo-19962115.jpeg?auto=compress&cs=tinysrgb&w=900&fm=webp",
      fallbackSrc: "",
      srcSet:
        "https://images.pexels.com/photos/19962115/pexels-photo-19962115.jpeg?auto=compress&cs=tinysrgb&w=480&fm=webp 480w, https://images.pexels.com/photos/19962115/pexels-photo-19962115.jpeg?auto=compress&cs=tinysrgb&w=960&fm=webp 960w",
      sourceUrl:
        "https://www.pexels.com/photo/father-feeding-his-son-during-a-birthday-party-19962115/",
      sourceLabel: "Pexels source",
      alt: "Illustrative stock photo of a father and baby at an Indian birthday celebration; not {babyName} or his family.",
      caption: "A joyful family celebration",
      date: "",
      format: "square",
    },
    {
      id: "birthday-joy",
      order: 4,
      src: "https://images.pexels.com/photos/38165262/pexels-photo-38165262.jpeg?auto=compress&cs=tinysrgb&w=900&fm=webp",
      fallbackSrc: "",
      srcSet:
        "https://images.pexels.com/photos/38165262/pexels-photo-38165262.jpeg?auto=compress&cs=tinysrgb&w=480&fm=webp 480w, https://images.pexels.com/photos/38165262/pexels-photo-38165262.jpeg?auto=compress&cs=tinysrgb&w=960&fm=webp 960w",
      sourceUrl:
        "https://images.pexels.com/photos/38165262/pexels-photo-38165262.jpeg",
      sourceLabel: "Pexels source",
      alt: "Illustrative stock photo of a baby enjoying a birthday celebration; not a photograph of {babyName}.",
      caption: "A day full of birthday joy",
      date: "",
      format: "square",
    },
    {
      id: "safari-family-celebration",
      order: 5,
      src: "https://images.pexels.com/photos/12996090/pexels-photo-12996090.jpeg?auto=compress&cs=tinysrgb&w=1100&fm=webp",
      fallbackSrc: "",
      srcSet:
        "https://images.pexels.com/photos/12996090/pexels-photo-12996090.jpeg?auto=compress&cs=tinysrgb&w=600&fm=webp 600w, https://images.pexels.com/photos/12996090/pexels-photo-12996090.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp 1200w",
      sourceUrl:
        "https://www.pexels.com/photo/a-lovely-family-smiling-at-the-camera-12996090/",
      sourceLabel: "Pexels source",
      alt: "Illustrative stock photo of a family at a safari-themed birthday celebration; not {babyName} or his family.",
      caption: "A safari gathering with family",
      date: "",
      format: "landscape",
    },
  ],
  surprise: {
    heading: "Surprise, Little Explorer!",
    message:
      "Today is all about you! May your birthday be filled with endless smiles, exciting adventures, beautiful memories and lots of love. Have the most wonderful birthday!",
  },
  gifts: {
    registryUrl: "",
    suggestions: [
      {
        id: "soft-safari-friend",
        category: "Toys",
        title: "A Soft Safari Friend",
        visible: true,
        description:
          "Soft toys, safari animal plushies and wooden toys for little hands and big imaginations.",
        imageUrl:
          "https://images.pexels.com/photos/4887203/pexels-photo-4887203.jpeg?auto=compress&cs=tinysrgb&w=900&fm=webp",
        imageAlt: "A brown plush bear beside a stack of children's books.",
        imageSourceUrl:
          "https://www.pexels.com/photo/brown-bear-plush-toy-and-stack-of-books-4887203/",
        imageSourceLabel: "Pexels source",
        secondaryImageUrl:
          "https://images.pexels.com/photos/3663060/pexels-photo-3663060.jpeg?auto=compress&cs=tinysrgb&w=900&fm=webp",
        secondaryImageAlt: "Wooden animal figurines arranged on a light table.",
        secondaryImageSourceUrl:
          "https://www.pexels.com/photo/brown-wooden-animal-figurines-on-white-table-3663060/",
        secondaryImageSourceLabel: "Pexels source",
        productUrl: "",
      },
      {
        id: "storybook-keepsakes",
        category: "Books",
        title: "Stories to Grow With",
        visible: true,
        description:
          "Picture books, storybooks and interactive baby books for cosy story time.",
        imageUrl:
          "https://images.pexels.com/photos/31259040/pexels-photo-31259040.jpeg?auto=compress&cs=tinysrgb&w=900&fm=webp",
        imageAlt: "A colorful collection of children's storybooks on a wooden stand.",
        imageSourceUrl:
          "https://www.pexels.com/photo/colorful-children-s-book-display-on-wooden-stand-31259040/",
        imageSourceLabel: "Pexels source",
        productUrl: "",
      },
      {
        id: "little-outfits",
        category: "Clothing",
        title: "Comfort for Every Adventure",
        visible: true,
        description:
          "Baby outfits, ethnic wear and comfortable everyday clothing in little-explorer style.",
        imageUrl:
          "https://images.pexels.com/photos/3875082/pexels-photo-3875082.jpeg?auto=compress&cs=tinysrgb&w=900&fm=webp",
        imageAlt: "A neatly arranged collection of baby clothes and tiny outfits.",
        imageSourceUrl:
          "https://www.pexels.com/photo/clothes-for-newborn-placed-on-bed-3875082/",
        imageSourceLabel: "Pexels source",
        productUrl: "",
      },
      {
        id: "curious-discoveries",
        category: "Learning & Development",
        title: "Curiosity in Every Little Hand",
        visible: true,
        description:
          "Montessori toys, sensory toys and educational puzzles for playful discovery.",
        imageUrl:
          "https://images.pexels.com/photos/33971311/pexels-photo-33971311.jpeg?auto=compress&cs=tinysrgb&w=900&fm=webp",
        imageAlt: "Colorful wooden stacking toys arranged for hands-on play.",
        imageSourceUrl:
          "https://www.pexels.com/photo/colorful-wooden-stacking-toys-outdoors-33971311/",
        imageSourceLabel: "Pexels source",
        productUrl: "",
      },
      {
        id: "memory-makers",
        category: "Keepsakes",
        title: "A Keepsake to Treasure",
        visible: true,
        description:
          "Personalized gifts, memory books and customized birthday gifts to keep close.",
        imageUrl:
          "https://images.pexels.com/photos/29544803/pexels-photo-29544803.jpeg?auto=compress&cs=tinysrgb&w=900&fm=webp",
        imageAlt: "A framed baby footprint print displayed as a keepsake.",
        imageSourceUrl:
          "https://www.pexels.com/photo/framed-baby-footprint-on-minimalist-wall-art-29544803/",
        imageSourceLabel: "Pexels source",
        productUrl: "",
      },
      {
        id: "surprise-with-love",
        category: "Surprise Gifts",
        title: "A Surprise Chosen with Love",
        visible: true,
        description: "Something selected with love is always a lovely surprise.",
        imageUrl:
          "https://images.pexels.com/photos/35629391/pexels-photo-35629391.jpeg?auto=compress&cs=tinysrgb&w=900&fm=webp",
        imageAlt: "An elegant arrangement of floral gifts and wrapped boxes.",
        imageSourceUrl:
          "https://www.pexels.com/photo/elegant-floral-arrangements-with-gift-boxes-35629391/",
        imageSourceLabel: "Pexels source",
        productUrl: "",
      },
    ],
  },
  streaming: {
    platform: "YouTube Live",
    streamingUrl: "",
    scheduledDateISO: "",
    scheduledTime24: "",
    timeZone: "",
    embeddedVideoUrl: "",
    recordingUrl: "",
    status: "not-configured",
  },
  sharing: {
    whatsappNumber: "+91XXXXXXXXXX",
    contactEmail: "",
  },
  guestManagement: {
    invitedResponseCount: 0,
  },
  invitation: {
    sectionVisibility: {
      celebration: true,
      story: true,
      safariTrail: true,
      countdown: true,
      location: true,
      gallery: true,
      surprise: true,
      gifts: true,
      streaming: true,
      rsvp: true,
      footer: true,
    },
    animationsEnabled: true,
    welcomeScreenEnabled: true,
  },
};

const eventConfigurationStorageKey = "little-wild-one-event-config-v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isEventInformation(value: unknown): value is EventInformation {
  if (!isRecord(value)) {
    return false;
  }
  const sections = [
    "baby",
    "celebration",
    "content",
    "surprise",
    "gifts",
    "streaming",
    "sharing",
    "guestManagement",
    "invitation",
  ];
  if (
    !sections.every((section) => isRecord(value[section])) ||
    !isRecord(value.baby) ||
    !isRecord(value.celebration) ||
    !isRecord(value.gifts) ||
    !isRecord(value.streaming) ||
    !isRecord(value.guestManagement) ||
    !isRecord(value.invitation)
  ) {
    return false;
  }
  const baby = value.baby;
  const celebration = value.celebration;
  const gifts = value.gifts;
  const streaming = value.streaming;
  const guestManagement = value.guestManagement;
  const invitation = value.invitation;
  return (
    typeof baby.name === "string" &&
    typeof baby.age === "string" &&
    typeof baby.heroPhotoUrl === "string" &&
    typeof baby.parentsNames === "string" &&
    typeof baby.parentsMessage === "string" &&
    typeof celebration.dateISO === "string" &&
    typeof celebration.startTime24 === "string" &&
    typeof celebration.endTime24 === "string" &&
    typeof celebration.venue === "string" &&
    typeof celebration.address === "string" &&
    typeof celebration.mapsUrl === "string" &&
    typeof celebration.dressCode === "string" &&
    Array.isArray(value.gallery) &&
    value.gallery.every(
      (photo) =>
        isRecord(photo) &&
        typeof photo.id === "string" &&
        typeof photo.src === "string" &&
        typeof photo.caption === "string",
    ) &&
    Array.isArray(value.milestones) &&
    Array.isArray(gifts.suggestions) &&
    gifts.suggestions.every(
      (gift) =>
        isRecord(gift) &&
        typeof gift.id === "string" &&
        typeof gift.title === "string" &&
        typeof gift.visible === "boolean",
    ) &&
    typeof streaming.streamingUrl === "string" &&
    typeof streaming.recordingUrl === "string" &&
    typeof guestManagement.invitedResponseCount === "number" &&
    isRecord(invitation.sectionVisibility) &&
    Object.values(invitation.sectionVisibility).every(
      (visible) => typeof visible === "boolean",
    ) &&
    typeof invitation.animationsEnabled === "boolean" &&
    typeof invitation.welcomeScreenEnabled === "boolean"
  );
}

let eventConfigurationLoadError = "";

const eventConfigurationService = {
  load(): EventInformation {
    try {
      const serialized = window.localStorage.getItem(
        eventConfigurationStorageKey,
      );
      if (!serialized) {
        return structuredClone(defaultEventInfo);
      }
      const parsed: unknown = JSON.parse(serialized);
      if (!isEventInformation(parsed)) {
        throw new Error("Saved event configuration is incomplete or invalid.");
      }
      return parsed;
    } catch (error) {
      eventConfigurationLoadError =
        error instanceof Error
          ? error.message
          : "Saved configuration could not be loaded from this browser.";
      return structuredClone(defaultEventInfo);
    }
  },
  save(configuration: EventInformation) {
    try {
      window.localStorage.setItem(
        eventConfigurationStorageKey,
        JSON.stringify(configuration),
      );
    } catch (error) {
      if (
        error instanceof DOMException &&
        (error.name === "QuotaExceededError" ||
          error.name === "NS_ERROR_DOM_QUOTA_REACHED")
      ) {
        throw new Error(
          "Browser storage is full. Remove an uploaded photo or use a smaller image, then try saving again.",
        );
      }
      throw new Error(
        "Your browser could not save the invitation. Check available local storage and try again.",
      );
    }
  },
  reset() {
    try {
      window.localStorage.removeItem(eventConfigurationStorageKey);
    } catch {
      throw new Error(
        "Your browser could not clear the saved invitation configuration.",
      );
    }
  },
};

let eventInfo: EventInformation = eventConfigurationService.load();

function patchEventSection<K extends keyof EventInformation>(
  configuration: EventInformation,
  section: K,
  patch: Partial<EventInformation[K]>,
): EventInformation {
  return {
    ...configuration,
    [section]: { ...configuration[section], ...patch },
  };
}

async function createLocalImageDataUrl(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Choose an image file to continue.");
  }
  if (file.size > 12 * 1024 * 1024) {
    throw new Error("Choose an image smaller than 12 MB.");
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    throw new Error("This browser could not prepare the image preview.");
  }
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/webp", 0.78);
}

function formatEventCopy(copy: string) {
  return copy
    .replace(/\{babyName\}/g, getBabyName())
    .replace(/\{birthdayAge\}/g, getBirthdayAge());
}

function getBabyName() {
  return isProvided(eventInfo.baby.name) ? eventInfo.baby.name.trim() : "our little explorer";
}

function getBirthdayAge() {
  return isProvided(eventInfo.baby.age)
    ? eventInfo.baby.age.trim()
    : "birthday";
}

function isProvided(value: string) {
  return value.trim().length > 0 && !value.trim().startsWith("[");
}

function getSafeImageSource(value: string) {
  if (!isProvided(value)) {
    return null;
  }

  const source = value.trim();
  if (/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+=*$/.test(source)) {
    return source;
  }
  if (source.startsWith("/") && !source.startsWith("//")) {
    return source;
  }

  return getSafeHttpsUrl(source)?.href ?? null;
}

function getSafeImageSrcSet(value: string) {
  if (!isProvided(value)) {
    return "";
  }

  const candidates = value.split(",").map((candidate) => {
    const [source, descriptor, ...extra] = candidate.trim().split(/\s+/);
    if (
      !source ||
      extra.length > 0 ||
      (descriptor && !/^\d+(?:w|x)$/.test(descriptor))
    ) {
      return null;
    }

    const safeSource = getSafeImageSource(source);
    return safeSource ? [safeSource, descriptor].filter(Boolean).join(" ") : null;
  });

  return candidates.every((candidate) => candidate !== null)
    ? candidates.join(", ")
    : "";
}

function isValidTimeZone(value: string) {
  if (!isProvided(value)) {
    return false;
  }

  try {
    new Intl.DateTimeFormat("en-US", { timeZone: value.trim() });
    return true;
  } catch {
    return false;
  }
}

function isValidTime24(value: string) {
  const match = value.match(/^(\d{2}):(\d{2})$/);
  return Boolean(
    match &&
      Number(match[1]) <= 23 &&
      Number(match[2]) <= 59,
  );
}

function getEventDateParts() {
  const date = parseEventDate(eventInfo.celebration.dateISO);
  if (!date) {
    return null;
  }

  const formatted = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).formatToParts(new Date(Date.UTC(date.year, date.month - 1, date.day)));
  const values = Object.fromEntries(
    formatted.map((part) => [part.type, part.value]),
  );
  return {
    weekday: values.weekday,
    month: values.month,
    day: values.day,
    year: values.year,
  };
}

function getBirthdayDisplayDate() {
  const parts = getEventDateParts();
  return parts
    ? `${parts.weekday}, ${parts.month} ${parts.day}, ${parts.year}`
    : "Date to be announced";
}

function getEventTimeZoneLabel() {
  const { timeZone } = eventInfo.celebration;
  return getTimeZoneLabel(
    timeZone,
    getBirthdayTimestamp() ?? Date.now(),
  );
}

function getTimeZoneLabel(timeZone: string, timestamp: number) {
  if (!isValidTimeZone(timeZone)) {
    return "";
  }

  try {
    return (
      new Intl.DateTimeFormat("en-IN", {
        timeZone: timeZone.trim(),
        timeZoneName: "short",
      })
        .formatToParts(new Date(timestamp))
        .find((part) => part.type === "timeZoneName")?.value ?? ""
    );
  } catch {
    return "";
  }
}

function getVenueAddress() {
  const { address, cityPostal } = eventInfo.celebration;
  return [address, cityPostal].filter(isProvided).join(", ");
}

function formatEventTime(time24: string, fallback: string) {
  if (!isValidTime24(time24)) {
    return fallback;
  }

  const [hour, minute] = time24.split(":").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(Date.UTC(2020, 0, 1, hour, minute)));
}

function parseEventDate(dateISO: string) {
  const match = dateISO.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return null;
  }
  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const dayCount = new Date(Date.UTC(year, month, 0)).getUTCDate();

  if (year < 1000 || month < 1 || month > 12 || day < 1 || day > dayCount) {
    return null;
  }
  return { year, month, day };
}

function getEventTimestamp(
  dateISO: string,
  time24: string,
  timeZone: string,
) {
  const date = parseEventDate(dateISO);
  const timeMatch = time24.match(/^(\d{2}):(\d{2})$/);
  if (!date || !timeMatch) {
    return null;
  }

  const hour = Number(timeMatch[1]);
  const minute = Number(timeMatch[2]);
  if (hour > 23 || minute > 59) {
    return null;
  }

  const desiredUtc = Date.UTC(
    date.year,
    date.month - 1,
    date.day,
    hour,
    minute,
  );
  const localTimeZone = timeZone.trim();

  if (!localTimeZone) {
    const localDate = new Date(
      date.year,
      date.month - 1,
      date.day,
      hour,
      minute,
    );
    if (
      localDate.getFullYear() !== date.year ||
      localDate.getMonth() !== date.month - 1 ||
      localDate.getDate() !== date.day ||
      localDate.getHours() !== hour ||
      localDate.getMinutes() !== minute
    ) {
      return null;
    }
    return localDate.getTime();
  }

  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: localTimeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
    const getWallTime = (timestamp: number) => {
      const parts = formatter.formatToParts(new Date(timestamp));
      const values = Object.fromEntries(
        parts.map((part) => [part.type, part.value]),
      );
      return {
        year: Number(values.year),
        month: Number(values.month),
        day: Number(values.day),
        hour: Number(values.hour),
        minute: Number(values.minute),
      };
    };

    let timestamp = desiredUtc;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const wallTime = getWallTime(timestamp);
      const renderedUtc = Date.UTC(
        wallTime.year,
        wallTime.month - 1,
        wallTime.day,
        wallTime.hour,
        wallTime.minute,
      );
      const difference = desiredUtc - renderedUtc;
      if (difference === 0) {
        return timestamp;
      }
      timestamp += difference;
    }

    const resolved = getWallTime(timestamp);
    return resolved.year === date.year &&
      resolved.month === date.month &&
      resolved.day === date.day &&
      resolved.hour === hour &&
      resolved.minute === minute
      ? timestamp
      : null;
  } catch {
    return null;
  }
}

function getBirthdayTimestamp() {
  const { dateISO, startTime24, timeZone } = eventInfo.celebration;
  return getEventTimestamp(dateISO, startTime24, timeZone.trim());
}

function formatConfiguredDate(dateISO: string) {
  const date = parseEventDate(dateISO);
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(Date.UTC(date.year, date.month - 1, date.day)));
}

function getSafeHttpsUrl(value: string) {
  if (!isProvided(value)) {
    return null;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      ? url
      : null;
  } catch {
    return null;
  }
}

function getValidWhatsAppNumber(value: string) {
  const formattedNumber = value.trim();
  if (!/^\+?[\d\s().-]+$/.test(formattedNumber)) {
    return null;
  }

  const digits = formattedNumber.replace(/\D/g, "");
  return /^\d{7,15}$/.test(digits) ? digits : null;
}

function getValidContactEmail(value: string) {
  const email = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

function hasPrivateUrlParameters(url: URL) {
  return [...url.searchParams.keys()].some((key) =>
    /pass|pwd|token|secret|auth|credential|(?:^|_)key|zak/i.test(key),
  );
}

function getSafeStreamingUrlFor(
  platform: StreamingPlatform,
  streamingUrl: string,
) {
  const url = getSafeHttpsUrl(streamingUrl);
  if (!url || hasPrivateUrlParameters(url)) {
    return null;
  }

  const hostname = url.hostname.toLowerCase();
  const allowedHosts: Record<StreamingPlatform, (host: string) => boolean> = {
    "YouTube Live": (host) =>
      host === "youtube.com" ||
      host === "www.youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtu.be",
    "Facebook Live": (host) =>
      host === "facebook.com" ||
      host === "www.facebook.com" ||
      host === "fb.watch",
    Zoom: (host) => host === "zoom.us" || host.endsWith(".zoom.us"),
    "Google Meet": (host) => host === "meet.google.com",
  };

  return allowedHosts[platform](hostname) ? url.href : null;
}

function getSafeStreamingUrl() {
  return getSafeStreamingUrlFor(
    eventInfo.streaming.platform,
    eventInfo.streaming.streamingUrl,
  );
}

function getSafeEmbeddedVideoUrlFor(embeddedVideoUrl: string) {
  const url = getSafeHttpsUrl(embeddedVideoUrl);
  if (!url || hasPrivateUrlParameters(url)) {
    return null;
  }

  const isYouTubeEmbed =
    (url.hostname === "youtube.com" ||
      url.hostname === "www.youtube.com" ||
      url.hostname === "www.youtube-nocookie.com") &&
    /^\/embed\/[A-Za-z0-9_-]+\/?$/.test(url.pathname);

  return isYouTubeEmbed ? url.href : null;
}

function getSafeEmbeddedVideoUrl() {
  return getSafeEmbeddedVideoUrlFor(eventInfo.streaming.embeddedVideoUrl);
}

function getSafeRecordingUrlFor(recordingUrl: string) {
  const url = getSafeHttpsUrl(recordingUrl);
  return url && !hasPrivateUrlParameters(url) ? url.href : null;
}

function getSafeRecordingUrl() {
  return getSafeRecordingUrlFor(eventInfo.streaming.recordingUrl);
}

function getSecondsUntilBirthday(timestamp: number | null, now = Date.now()) {
  if (timestamp === null) {
    return null;
  }

  return Math.max(0, Math.floor((timestamp - now) / 1000));
}

function buildCalendarUrl() {
  const { celebration } = eventInfo;
  const timeZone = celebration.timeZone.trim();
  const parameters = new URLSearchParams({
    action: "TEMPLATE",
    text: `${getBabyName()} — ${getBirthdayAge()} safari celebration`,
    details: formatEventCopy(eventInfo.baby.introduction),
  });
  const location = [
    celebration.venue,
    celebration.address,
    celebration.cityPostal,
  ]
    .filter(isProvided)
    .join(", ");

  if (location) {
    parameters.set("location", location);
  }

  const startTimestamp = getEventTimestamp(
    celebration.dateISO,
    celebration.startTime24,
    timeZone,
  );
  const endTimestamp = getEventTimestamp(
    celebration.dateISO,
    celebration.endTime24,
    timeZone,
  );

  if (
    startTimestamp !== null &&
    endTimestamp !== null &&
    endTimestamp > startTimestamp
  ) {
    const formatCalendarDate = (timestamp: number) => {
      const eventDate = new Date(timestamp);
      if (timeZone) {
        const parts = new Intl.DateTimeFormat("en-US", {
          timeZone,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h23",
        }).formatToParts(eventDate);
        const values = Object.fromEntries(
          parts.map((part) => [part.type, part.value]),
        );
        return `${values.year}${values.month}${values.day}T${values.hour}${values.minute}00`;
      }

      const compactDate = `${eventDate.getFullYear()}${String(eventDate.getMonth() + 1).padStart(2, "0")}${String(eventDate.getDate()).padStart(2, "0")}`;
      const compactTime = `${String(eventDate.getHours()).padStart(2, "0")}${String(eventDate.getMinutes()).padStart(2, "0")}00`;
      return `${compactDate}T${compactTime}`;
    };

    parameters.set(
      "dates",
      `${formatCalendarDate(startTimestamp)}/${formatCalendarDate(endTimestamp)}`,
    );
    if (timeZone) {
      parameters.set("ctz", timeZone);
    }
  }

  return `https://calendar.google.com/calendar/render?${parameters.toString()}`;
}

function buildMapsUrl() {
  return getVenueLocation()?.mapUrl ?? null;
}

function getConfiguredMapsUrl(value: string) {
  if (!isProvided(value)) {
    return null;
  }

  try {
    const url = new URL(value);
    const isGoogleMaps =
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      (url.hostname === "maps.google.com" ||
        ((url.hostname === "google.com" ||
          url.hostname === "www.google.com") &&
          url.pathname.startsWith("/maps")) ||
        url.hostname === "maps.app.goo.gl" ||
        (url.hostname === "goo.gl" && url.pathname.startsWith("/maps")));

    return isGoogleMaps ? url.href : null;
  } catch {
    return null;
  }
}

function getValidCoordinates(value: string) {
  if (!isProvided(value)) {
    return null;
  }

  const match = value.trim().match(/^(-?\d{1,3}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)$/);

  if (!match) {
    return null;
  }

  const latitude = Number(match[1]);
  const longitude = Number(match[2]);

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return null;
  }

  return `${latitude},${longitude}`;
}

function getVenueLocation() {
  const { address, cityPostal, coordinates, mapsUrl, venue } =
    eventInfo.celebration;
  const configuredMapsUrl = getConfiguredMapsUrl(mapsUrl);
  const validCoordinates = getValidCoordinates(coordinates);
  const venueAddress = [address, cityPostal].filter(isProvided).join(", ");
  const hasAddressLocation = Boolean(validCoordinates || venueAddress);
  const hasConfiguredLocation = hasAddressLocation || Boolean(configuredMapsUrl);
  const mapQuery = hasAddressLocation
    ? validCoordinates ??
      [venue, address, cityPostal].filter(isProvided).join(", ")
    : "";

  if (!hasConfiguredLocation || (!mapQuery && !configuredMapsUrl)) {
    return null;
  }

  const searchUrl = mapQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`
    : null;
  const directionsUrl = mapQuery
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`
    : configuredMapsUrl;
  const previewUrl = mapQuery
    ? `https://maps.google.com/maps?output=embed&q=${encodeURIComponent(mapQuery)}`
    : configuredMapsUrl ?? "";

  return {
    directionsUrl,
    mapUrl: configuredMapsUrl ?? searchUrl,
    previewUrl,
    venueAddress,
  };
}

function getEventConfigurationWarnings() {
  const warnings: string[] = [];
  const { baby, celebration, gifts, streaming, sharing } = eventInfo;

  if (!isProvided(baby.name)) {
    warnings.push("baby.name is missing; a generic name will be used.");
  }
  if (!parseEventDate(celebration.dateISO)) {
    warnings.push("celebration.dateISO is missing or invalid.");
  }
  if (!isValidTime24(celebration.startTime24)) {
    warnings.push("celebration.startTime24 is missing or invalid.");
  }
  if (!isValidTime24(celebration.endTime24)) {
    warnings.push("celebration.endTime24 is missing or invalid.");
  }
  const eventStart = getEventTimestamp(
    celebration.dateISO,
    celebration.startTime24,
    celebration.timeZone,
  );
  const eventEnd = getEventTimestamp(
    celebration.dateISO,
    celebration.endTime24,
    celebration.timeZone,
  );
  if (eventStart !== null && eventEnd !== null && eventEnd <= eventStart) {
    warnings.push("celebration.endTime24 must be later than startTime24.");
  }
  if (
    isProvided(celebration.timeZone) &&
    !isValidTimeZone(celebration.timeZone)
  ) {
    warnings.push("celebration.timeZone is not a valid IANA time zone.");
  } else if (!isProvided(celebration.timeZone)) {
    warnings.push("celebration.timeZone is empty; countdowns use each guest's local time.");
  }
  if (!isProvided(celebration.venue)) {
    warnings.push("celebration.venue is missing; location directions are hidden.");
  } else if (!getVenueLocation()) {
    warnings.push("No valid venue address, coordinates, or Google Maps URL is configured.");
  }
  if (
    isProvided(celebration.mapsUrl) &&
    !getConfiguredMapsUrl(celebration.mapsUrl)
  ) {
    warnings.push("celebration.mapsUrl is not a valid HTTPS Google Maps URL.");
  }
  if (
    !getSafeImageSource(baby.heroPhotoUrl) &&
    !getSafeImageSource(baby.storyPhotoUrl) &&
    !eventInfo.gallery.some((photo) => getSafeImageSource(photo.src))
  ) {
    warnings.push("No valid hero, baby, or gallery photographs are configured.");
  }
  if (eventInfo.gallery.length === 0) {
    warnings.push("The gallery is empty; a clear placeholder is shown.");
  }
  if (
    gifts.suggestions.some(
      (gift) => gift.visible && !getSafeHttpsUrl(gift.productUrl),
    )
  ) {
    warnings.push("Some visible gift suggestions have no safe product URL.");
  }
  if (
    gifts.suggestions.some(
      (gift) => gift.visible && !getSafeImageSource(gift.imageUrl),
    )
  ) {
    warnings.push("Some visible gift suggestions have no valid product photograph.");
  }
  if (
    isProvided(streaming.streamingUrl) &&
    !getSafeStreamingUrl()
  ) {
    warnings.push("streaming.streamingUrl is invalid or does not match the selected platform.");
  } else if (
    streaming.status !== "not-configured" &&
    streaming.status !== "completed" &&
    !getSafeStreamingUrl()
  ) {
    warnings.push("Live streaming is not configured; guests see the placeholder state.");
  }
  if (
    isProvided(streaming.scheduledDateISO) &&
    !parseEventDate(streaming.scheduledDateISO)
  ) {
    warnings.push("streaming.scheduledDateISO is invalid.");
  }
  if (
    isProvided(streaming.scheduledTime24) &&
    !isValidTime24(streaming.scheduledTime24)
  ) {
    warnings.push("streaming.scheduledTime24 is invalid.");
  }
  if (
    isProvided(streaming.timeZone) &&
    !isValidTimeZone(streaming.timeZone)
  ) {
    warnings.push("streaming.timeZone is not a valid IANA time zone.");
  }
  if (
    isProvided(streaming.embeddedVideoUrl) &&
    !getSafeEmbeddedVideoUrl()
  ) {
    warnings.push("streaming.embeddedVideoUrl must be a public YouTube embed URL.");
  }
  if (isProvided(streaming.recordingUrl) && !getSafeRecordingUrl()) {
    warnings.push("streaming.recordingUrl is invalid or contains private URL parameters.");
  }
  if (!getValidWhatsAppNumber(sharing.whatsappNumber)) {
    warnings.push("sharing.whatsappNumber is missing or invalid; WhatsApp links are disabled.");
  }
  if (
    isProvided(sharing.contactEmail) &&
    !getValidContactEmail(sharing.contactEmail)
  ) {
    warnings.push("sharing.contactEmail is invalid; the contact link is hidden.");
  }

  return warnings;
}

function SafariLandscape() {
  const illustrationId = useId();
  return (
    <svg
      className="safari-landscape"
      viewBox="0 0 760 510"
      role="img"
      aria-labelledby={`${illustrationId}-title ${illustrationId}-description`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={`${illustrationId}-title`}>A little safari gathering</title>
      <desc id={`${illustrationId}-description`}>
        A baby elephant, giraffe, and lion meet beneath the savanna sun, framed
        by gentle jungle leaves.
      </desc>
      <circle className="scene-sun" cx="523" cy="145" r="79" />
      <path
        className="scene-sun-ray"
        d="M523 34V18m0 254v-16m111-111h17m-273 0h17m207-78 12-12m-192 192 12-12m168 0 12 12M324 65l12 12"
      />
      <path
        className="scene-hill scene-hill-back"
        d="M0 347c88-69 191-83 298-42 97 38 162 44 257-2 75-36 144-33 205 8v199H0Z"
      />
      <path
        className="scene-hill scene-hill-front"
        d="M0 404c100-40 185-31 272 4 87 36 156 26 251-9 88-33 165-24 237 7v104H0Z"
      />

      <g className="scene-leaf scene-leaf-left" aria-hidden="true">
        <path d="M65 411c24-92 23-169 3-251" />
        <path d="M69 331c-48-7-72-38-68-79 37 3 62 29 68 79Zm-2-58c40-20 56-52 46-88-32 12-48 41-46 88Zm-8-56C24 196 8 170 18 140c29 13 44 40 41 77Z" />
        <path d="M103 403c3-51 18-88 48-119" />
        <path d="M120 346c-31-7-47-27-47-55 25 3 41 21 47 55Zm9-25c33-9 49-30 47-58-25 7-41 27-47 58Z" />
      </g>
      <g className="scene-leaf scene-leaf-right" aria-hidden="true">
        <path d="M701 411c-17-76-17-146-1-211" />
        <path d="M699 341c37-11 55-36 53-69-30 4-49 26-53 69Zm-1-51c-34-18-46-45-34-71 26 12 38 37 34 71Z" />
      </g>

      <g className="scene-animal animal-giraffe" aria-hidden="true">
        <ellipse className="animal-shadow" cx="257" cy="421" rx="70" ry="10" />
        <path className="giraffe-neck" d="M226 347h48l12 68h-69Z" />
        <ellipse className="giraffe-body" cx="249" cy="374" rx="54" ry="35" />
        <path className="giraffe-leg" d="M218 391h16v33h-16Zm45 0h16v33h-16Z" />
        <g className="giraffe-head">
          <path className="giraffe-face" d="M223 271c0-31 21-55 50-55s50 24 50 55v31c0 20-19 34-50 34s-50-14-50-34Z" />
          <path className="giraffe-ear" d="m230 237-26-19 8 38m103-19 26-19-8 38" />
          <path className="giraffe-horn" d="M246 222v-20m48 20v-20" />
          <circle className="giraffe-spot" cx="249" cy="252" r="7" />
          <circle className="giraffe-spot" cx="292" cy="273" r="6" />
          <circle className="giraffe-spot" cx="255" cy="301" r="5" />
          <circle className="animal-eye" cx="254" cy="276" r="3.5" />
          <circle className="animal-eye" cx="293" cy="276" r="3.5" />
          <path className="giraffe-muzzle" d="M255 299c13-9 27-9 40 0" />
          <path className="animal-smile" d="M266 311q9 7 18 0" />
        </g>
      </g>

      <g className="scene-animal animal-elephant" aria-hidden="true">
        <ellipse className="animal-shadow" cx="407" cy="430" rx="85" ry="12" />
        <path
          className="elephant-body"
          d="M337 357c0-42 32-74 76-74h20c44 0 76 32 76 74v49c0 20-15 35-35 35h-21v-56h-21v56h-37v-56h-21v56h-22c-20 0-35-15-35-35Z"
        />
        <path className="elephant-ear" d="M362 306c-40-21-76 2-75 45 1 32 20 57 51 60 17-28 25-64 24-105Z" />
        <path className="elephant-ear-inner" d="M346 324c-24-9-43 6-42 29 0 19 11 34 27 38 9-20 14-44 15-67Z" />
        <path className="elephant-head" d="M374 311c0-33 24-58 57-58s57 25 57 58v73c0 39-24 64-57 64s-57-25-57-64Z" />
        <path className="elephant-trunk" d="M455 351c2 30 25 33 24 55-1 13-10 21-23 18-13-3-19-14-16-25 2-8 8-12 13-15-18 3-31-4-32-17-1-11 7-18 17-18 6 0 12 1 17 2Z" />
        <circle className="animal-eye" cx="462" cy="326" r="3.5" />
        <circle className="animal-cheek" cx="435" cy="350" r="6" />
        <path className="animal-toes" d="M357 422v8m59-8v8m55-8v8" />
      </g>

      <g className="scene-animal animal-lion" aria-hidden="true">
        <ellipse className="animal-shadow" cx="566" cy="422" rx="67" ry="10" />
        <path className="lion-body" d="M515 361c0-29 22-49 52-49h14c30 0 52 20 52 49v37h-24v25h-17v-25h-38v25h-17v-25h-22Z" />
        <path className="lion-mane" d="M523 271c-8-12 2-27 17-25 0-16 17-24 29-14 10-13 30-10 34 6 16-2 27 12 20 26 16 7 18 28 3 37 7 16-4 31-20 29-8 15-28 16-37 3-14 9-31 1-32-15-17-5-21-24-8-35-9-5-10-12-6-12Z" />
        <circle className="lion-face" cx="565" cy="307" r="39" />
        <circle className="lion-ear" cx="537" cy="277" r="10" />
        <circle className="lion-ear" cx="594" cy="277" r="10" />
        <circle className="animal-eye" cx="551" cy="301" r="3.5" />
        <circle className="animal-eye" cx="579" cy="301" r="3.5" />
        <path className="lion-muzzle" d="M550 316q15-13 30 0l-15 17Z" />
        <path className="lion-nose" d="M560 317h10" />
        <path className="animal-smile" d="M565 331v7m0-7q-8 8-14 2m14-2q8 8 14 2" />
      </g>

      <g className="scene-birds" aria-hidden="true">
        <path d="M179 155q12-14 24 0 12-14 24 0m47-45q9-10 18 0 9-10 18 0" />
      </g>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13H4V6a1 1 0 0 1 1-1Z" />
      <path d="M8 13h3m2 0h3m-8 4h3" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
      <path d="M9 3v15m6-12v15" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  );
}

function SafariSprig() {
  return (
    <svg
      className="details-sprig"
      viewBox="0 0 126 116"
      fill="none"
      aria-hidden="true"
    >
      <path d="M62 108c2-35 3-66-1-98" />
      <path d="M61 79C42 69 34 55 38 39c16 4 24 16 23 40Zm1-19c19-11 25-26 20-42-15 7-22 20-20 42Zm0 39C43 89 32 77 33 63c14 2 24 12 29 36Zm0-20c17-10 26-23 25-37-15 5-24 17-25 37Z" />
      <path d="M42 108h40" />
      <circle cx="101" cy="25" r="14" />
      <path d="M101 4v-3m0 48v-3m21-21h3m-48 0h3m36-15 2-2m-34 34 2-2m30 0 2 2M83 11l2 2" />
    </svg>
  );
}

function MarigoldMark() {
  return (
    <svg
      className="celebration-marigold"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.2">
        <ellipse cx="16" cy="7" rx="3" ry="5" />
        <ellipse cx="16" cy="25" rx="3" ry="5" />
        <ellipse cx="7" cy="16" rx="5" ry="3" />
        <ellipse cx="25" cy="16" rx="5" ry="3" />
        <ellipse cx="9.7" cy="9.7" rx="3" ry="5" transform="rotate(-45 9.7 9.7)" />
        <ellipse cx="22.3" cy="9.7" rx="3" ry="5" transform="rotate(45 22.3 9.7)" />
        <ellipse cx="9.7" cy="22.3" rx="3" ry="5" transform="rotate(45 9.7 22.3)" />
        <ellipse cx="22.3" cy="22.3" rx="3" ry="5" transform="rotate(-45 22.3 22.3)" />
        <circle cx="16" cy="16" r="3.1" />
      </g>
    </svg>
  );
}

function MangoLeafMark() {
  return (
    <svg
      className="celebration-mango-leaves"
      viewBox="0 0 42 28"
      fill="none"
      aria-hidden="true"
    >
      <path d="M21 25V5" />
      <path d="M21 16C11 16 6 11 5 4c9 0 15 4 16 12Zm0-4c1-8 7-12 16-11-1 7-6 12-16 13Z" />
    </svg>
  );
}

function getStoredStringList(key: string) {
  try {
    const stored = sessionStorage.getItem(key);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === "string")
      : [];
  } catch {
    return [];
  }
}

function hasEnteredAdventure() {
  try {
    return sessionStorage.getItem("little-wild-one-entered-v1") === "yes";
  } catch {
    return false;
  }
}

const adventureStops: { id: string; label: string; companion: JungleAnimal }[] = [
  { id: "home", label: "Welcome", companion: "elephant" },
  { id: "countdown", label: "Birthday Countdown", companion: "lion" },
  { id: "invitation-details", label: "Celebration Details", companion: "giraffe" },
  { id: "little-story", label: "Baby’s Story", companion: "monkey" },
  { id: "little-moments", label: "Photo Gallery", companion: "zebra" },
  { id: "little-gifts", label: "Gift Corner", companion: "toucan" },
  { id: "celebrate-online", label: "Live Celebration", companion: "elephant" },
  { id: "little-wishes", label: "Wish Wall", companion: "lion" },
  { id: "rsvp", label: "RSVP", companion: "monkey" },
  { id: "destination", label: "Celebration Location", companion: "giraffe" },
];

const railwayTrainPositions = {
  desktop: [
    [0, 20], [20, 20], [40, 20], [60, 20], [80, 20], [91, 47],
    [80, 74], [60, 74], [40, 74], [20, 74], [0, 74],
  ],
  tablet: [
    [0, 10], [33, 10], [67, 10], [84, 23], [67, 36], [33, 36],
    [16, 49], [33, 61], [67, 61], [84, 74], [100, 87],
  ],
} as const;

function SafariRailwayTrain() {
  return (
    <svg viewBox="0 0 76 48" aria-hidden="true">
      <path d="M7 34h61v7H7z" fill="#795638" />
      <path d="M12 19h35v16H12z" fill="#64875c" />
      <path d="M47 24h12l8 11H47z" fill="#d88e61" />
      <path d="M18 11h20l8 9H18z" fill="#486d4b" />
      <path d="M23 14h10v8H23z" fill="#f8efdc" />
      <path d="M51 17h7v8h-7z" fill="#f2c95e" />
      <path d="M15 16h6v-8h8v8" fill="#d88e61" />
      <path d="M17 8h9" stroke="#486d4b" strokeWidth="3" strokeLinecap="round" />
      <g className="railway-wheel">
        <circle cx="23" cy="39" r="6" fill="#354d39" />
        <path d="M23 34v10" stroke="#f2c95e" strokeWidth="2" />
      </g>
      <g className="railway-wheel">
        <circle cx="54" cy="39" r="6" fill="#354d39" />
        <path d="M54 34v10" stroke="#f2c95e" strokeWidth="2" />
      </g>
      <path d="M9 29h5" stroke="#f2c95e" strokeWidth="3" strokeLinecap="round" />
      <circle cx="12" cy="11" r="3" fill="#f2c95e" opacity=".8" />
    </svg>
  );
}

function getVisibleAdventureStops() {
  const visibility: Partial<Record<string, boolean>> = {
    countdown: eventInfo.invitation.sectionVisibility.countdown,
    "little-story": eventInfo.invitation.sectionVisibility.story,
    "invitation-details": eventInfo.invitation.sectionVisibility.celebration,
    "little-moments": eventInfo.invitation.sectionVisibility.gallery,
    "little-gifts": eventInfo.invitation.sectionVisibility.gifts,
    "celebrate-online": eventInfo.invitation.sectionVisibility.streaming,
    destination: eventInfo.invitation.sectionVisibility.location,
    rsvp: eventInfo.invitation.sectionVisibility.rsvp,
  };
  return adventureStops.filter(
    (stop) => stop.id === "home" || visibility[stop.id] !== false,
  );
}

const jungleAnimalMessages: Record<JungleAnimal, string> = {
  elephant: "A gentle trunk wave for our little explorer!",
  lion: "A happy little roar for a wonderful day!",
  giraffe: "A tall hello from the treetops!",
  monkey: "A cheeky wave from the jungle canopy!",
  zebra: "A stripey little hello, just for you!",
  toucan: "A bright beakful of birthday cheer!",
};

function SafariAdventure({
  visitedSections,
  activeSection,
  onAnimalMessage,
  activeAnimal,
  animalPulse,
  soundEnabled,
  soundMessage,
  onToggleSound,
}: {
  visitedSections: string[];
  activeSection: string;
  onAnimalMessage: (animal: JungleAnimal) => void;
  activeAnimal: JungleAnimal | null;
  animalPulse: number;
  soundEnabled: boolean;
  soundMessage: string;
  onToggleSound: () => void;
}) {
  const trailRef = useRef<HTMLElement>(null);
  const visibleStops = getVisibleAdventureStops();
  const mapDestinations = [
    { id: "destination", title: "The Celebration", note: "The party clearing", symbol: "✿" },
    { id: "little-moments", title: "Photo Gallery", note: "Little memories", symbol: "◉" },
    { id: "little-gifts", title: "Gift Corner", note: "A thoughtful stop", symbol: "◇" },
  ].filter((destination) =>
    destination.id === "destination"
      ? eventInfo.invitation.sectionVisibility.location
      : destination.id === "little-moments"
        ? eventInfo.invitation.sectionVisibility.gallery
        : eventInfo.invitation.sectionVisibility.gifts,
  );
  const animalDetails: { id: JungleAnimal; label: string }[] = [
    { id: "elephant", label: "Elephant" },
    { id: "lion", label: "Lion" },
    { id: "giraffe", label: "Giraffe" },
    { id: "monkey", label: "Monkey" },
    { id: "zebra", label: "Zebra" },
    { id: "toucan", label: "Toucan" },
  ];
  const progress = Math.round(
    (visitedSections.length / visibleStops.length) * 100,
  );
  const completedStopCount = Math.min(visitedSections.length, visibleStops.length);
  const desktopTrainPosition = railwayTrainPositions.desktop[completedStopCount] ??
    railwayTrainPositions.desktop[0];
  const tabletTrainPosition = railwayTrainPositions.tablet[completedStopCount] ??
    railwayTrainPositions.tablet[0];
  const mobileTrainPosition = [50, 5 + completedStopCount * 9] as const;
  const isComplete = visitedSections.length >= visibleStops.length;

  useEffect(() => {
    const trail = trailRef.current;
    if (!trail) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      trail.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trail.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(trail);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="adventure-section"
      id="safari-trail"
      aria-labelledby="adventure-title"
    >
      <header className="adventure-heading">
        <p className="adventure-kicker">
          <span aria-hidden="true">✦</span> YOUR LITTLE SAFARI TRAIL
        </p>
        <h2 id="adventure-title">Choose Your Next Little Adventure</h2>
        <p>
          Follow the winding path to stories, celebrations and little moments
          made with love.
        </p>
      </header>

      <div className="adventure-progress" aria-live="polite">
        <div className="adventure-progress-copy">
          <span className="adventure-progress-icon" aria-hidden="true">✿</span>
          <span>
            <strong>
              {isComplete
                ? "You’ve explored every little corner!"
                : `${visitedSections.length} of ${visibleStops.length} little stops explored`}
            </strong>
            <span className="adventure-progress-note">
              {isComplete
                ? "What a lovely journey. We can’t wait to celebrate with you!"
                : "Explore at your own pace — every stop is optional."}
            </span>
          </span>
        </div>
        <div
          className="adventure-progress-track"
          role="progressbar"
          aria-label="Invitation exploration progress"
          aria-valuemin={0}
          aria-valuemax={visibleStops.length}
          aria-valuenow={visitedSections.length}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <nav
        className="trail-signposts"
        aria-label="Safari trail sections"
        ref={trailRef}
      >
        <svg className="railway-track railway-track-desktop" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <pattern id="railway-sleepers-desktop" width="48" height="1000" patternUnits="userSpaceOnUse">
              <path d="M24 180v40 M24 730v40" stroke="#b58a61" strokeWidth="14" strokeLinecap="round" />
            </pattern>
          </defs>
          <rect className="railway-sleepers" width="1000" height="1000" fill="url(#railway-sleepers-desktop)" />
          <path className="railway-rail" d="M0 190H890Q910 190 910 210V730Q910 750 890 750H0" />
          <path className="railway-rail" d="M0 210H880Q890 210 890 220V720Q890 730 880 730H0" />
        </svg>
        <svg className="railway-track railway-track-tablet" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <pattern id="railway-sleepers-tablet" width="64" height="1000" patternUnits="userSpaceOnUse">
              <path d="M32 80v40 M32 340v40 M32 590v40 M32 830v40" stroke="#b58a61" strokeWidth="14" strokeLinecap="round" />
            </pattern>
          </defs>
          <rect className="railway-sleepers" width="1000" height="1000" fill="url(#railway-sleepers-tablet)" />
          <path className="railway-rail" d="M0 90H824Q834 90 834 100V340Q834 350 824 350H176Q166 350 166 360V590Q166 600 176 600H824Q834 600 834 610V850H1000" />
          <path className="railway-rail" d="M0 110H844Q844 110 844 120V340Q844 360 824 360H176Q156 360 156 380V590Q156 610 176 610H824Q844 610 844 630V850H1000" />
        </svg>
        <svg className="railway-track railway-track-mobile" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <pattern id="railway-sleepers-mobile" width="1000" height="64" patternUnits="userSpaceOnUse">
              <path d="M465 32h70" stroke="#b58a61" strokeWidth="14" strokeLinecap="round" />
            </pattern>
          </defs>
          <rect className="railway-sleepers" width="1000" height="1000" fill="url(#railway-sleepers-mobile)" />
          <path className="railway-rail" d="M488 20V980" />
          <path className="railway-rail" d="M512 20V980" />
        </svg>
        <span
          className="railway-train railway-train-desktop"
          style={{ left: `${desktopTrainPosition[0]}%`, top: `${desktopTrainPosition[1]}%` }}
          aria-hidden="true"
        >
          <SafariRailwayTrain />
        </span>
        <span
          className="railway-train railway-train-tablet"
          style={{ left: `${tabletTrainPosition[0]}%`, top: `${tabletTrainPosition[1]}%` }}
          aria-hidden="true"
        >
          <SafariRailwayTrain />
        </span>
        <span
          className="railway-train railway-train-mobile"
          style={{ left: `${mobileTrainPosition[0]}%`, top: `${mobileTrainPosition[1]}%` }}
          aria-hidden="true"
        >
          <SafariRailwayTrain />
        </span>
        {visibleStops.map((stop, index) => {
          const visited = visitedSections.includes(stop.id);
          return (
            <a
              className={`trail-signpost${visited ? " is-visited" : ""}${activeSection === stop.id ? " is-active" : ""}`}
              href={`#${stop.id}`}
              key={stop.id}
              aria-current={activeSection === stop.id ? "location" : undefined}
            >
              <span className="trail-signpost-number">{String(index + 1).padStart(2, "0")}</span>
              <span className={`trail-signpost-symbol animal-${stop.companion}`} aria-hidden="true">
                <SafariCompanion animal={stop.companion} />
                {visited && <span className="trail-signpost-check">✓</span>}
              </span>
              <span className="trail-signpost-label">{stop.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="safari-map" aria-labelledby="safari-map-title">
        <div className="safari-map-heading">
          <div>
            <p className="adventure-kicker">A LITTLE MAP FOR LITTLE WONDERS</p>
            <h3 id="safari-map-title">The Jungle Gathering</h3>
          </div>
          <span className="map-compass" role="img" aria-label="Map compass, north">
            N<span>✦</span>
          </span>
        </div>
        <div className="safari-map-canvas">
          <svg
            className="safari-map-art"
            viewBox="0 0 1000 390"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <path className="map-river" d="M-20 305c118-45 185-60 278-26s133 36 215-16 132-42 204-9 129 33 204-3 100-37 145-23v175H-20Z" />
            <path className="map-trail" d="M40 190c119-101 225 66 330-8s169-101 252-10 164 83 331-37" />
            <path className="map-trail-center" d="M40 190c119-101 225 66 330-8s169-101 252-10 164 83 331-37" />
            <g className="map-tree map-tree-one">
              <path d="M111 250v-41m0 22-16-18m16 7 15-21" />
              <circle cx="111" cy="188" r="24" />
            </g>
            <g className="map-tree map-tree-two">
              <path d="M848 286v-46m0 25-18-20m18 8 18-22" />
              <circle cx="848" cy="218" r="27" />
            </g>
            <g className="map-tree map-tree-three">
              <path d="M486 87V56m0 17-13-15m13 7 13-16" />
              <circle cx="486" cy="39" r="18" />
            </g>
          </svg>
          {mapDestinations.map((destination, index) => (
            <a
              className={`map-destination map-destination-${index + 1}${activeSection === destination.id ? " is-active" : ""}`}
              href={`#${destination.id}`}
              key={destination.id}
              aria-current={activeSection === destination.id ? "location" : undefined}
            >
              <span className="map-destination-mark" aria-hidden="true">
                {destination.symbol}
              </span>
              <span className="map-destination-label">{destination.title}</span>
              <span className="map-destination-note">{destination.note}</span>
            </a>
          ))}
          <span className="map-landmark map-landmark-elephant" aria-hidden="true">
            <SafariCompanion animal="elephant" />
          </span>
          <span className="map-landmark map-landmark-lion" aria-hidden="true">
            <SafariCompanion animal="lion" />
          </span>
          <span className="map-landmark map-landmark-giraffe" aria-hidden="true">
            <SafariCompanion animal="giraffe" />
          </span>
          <span className="map-landmark map-landmark-monkey" aria-hidden="true">
            <SafariCompanion animal="monkey" />
          </span>
          <span className="map-landmark map-landmark-butterfly" aria-hidden="true" />
          <span className="map-landmark map-landmark-leaf" aria-hidden="true" />
          <svg className="safari-footprints" viewBox="0 0 90 30" aria-hidden="true">
            <path d="M12 17c-4 0-6 3-5 6 1 2 4 2 6 0l3-3c1-1 0-3-4-3Zm2-7c-2-2-4-1-4 1 0 2 2 3 4 3s3-2 2-3c0-1-1-2-2-1Zm9 0c-2-2-4-1-4 1 0 2 2 3 4 3s3-2 2-3c0-1-1-2-2-1Zm9 0c-2-2-4-1-4 1 0 2 2 3 4 3s3-2 2-3c0-1-1-2-2-1Zm2 7c-4 0-6 3-5 6 1 2 4 2 6 0l3-3c1-1 0-3-4-3Z" />
            <path d="M56 13c-4 0-6 3-5 6 1 2 4 2 6 0l3-3c1-1 0-3-4-3Zm2-7c-2-2-4-1-4 1 0 2 2 3 4 3s3-2 2-3c0-1-1-2-2-1Zm9 0c-2-2-4-1-4 1 0 2 2 3 4 3s3-2 2-3c0-1-1-2-2-1Zm9 0c-2-2-4-1-4 1 0 2 2 3 4 3s3-2 2-3c0-1-1-2-2-1Zm2 7c-4 0-6 3-5 6 1 2 4 2 6 0l3-3c1-1 0-3-4-3Z" />
          </svg>
          <span className="map-map-label map-map-label-river">The Wondering River</span>
        </div>
      </div>

      <div className="safari-friends">
        <div className="safari-friends-copy">
          <p className="adventure-kicker">JUNGLE FRIENDS</p>
          <p>Tap a friend for a little hello.</p>
        </div>
        <div
          className="safari-friend-buttons"
          role="group"
          aria-label="Interactive jungle friends"
        >
          {animalDetails.map((animal) => (
            <button
              className={`safari-friend${activeAnimal === animal.id ? ` is-active is-pulse-${animalPulse % 2 === 0 ? "even" : "odd"}` : ""}`}
              type="button"
              key={animal.id}
              aria-label={`Say hello to the ${animal.label}`}
              aria-pressed={activeAnimal === animal.id}
              onClick={() => onAnimalMessage(animal.id)}
            >
              <span className={`safari-friend-illustration animal-${animal.id}`} aria-hidden="true">
                <SafariCompanion animal={animal.id} />
              </span>
              <span>{animal.label}</span>
            </button>
          ))}
        </div>
        <p className="safari-friend-message" role="status" aria-live="polite">
          {activeAnimal
            ? jungleAnimalMessages[activeAnimal]
            : "Your new jungle friends are waiting to say hello."}
        </p>
      </div>

      <div className="jungle-sound-control">
        <span className="sound-control-icon" aria-hidden="true">{soundEnabled ? "♫" : "♪"}</span>
        <span className="sound-control-copy">
          <strong>Jungle ambience</strong>
          <span>{soundMessage}</span>
        </span>
        <button
          className={`sound-toggle${soundEnabled ? " is-on" : ""}`}
          type="button"
          aria-pressed={soundEnabled}
          aria-label={soundEnabled ? "Turn jungle ambience off" : "Turn jungle ambience on"}
          onClick={onToggleSound}
        >
          <span />
        </button>
      </div>
    </section>
  );
}

function CelebrationDetails() {
  const sectionRef = useRef<HTMLElement>(null);
  const dateParts = getEventDateParts();
  const mapsUrl = buildMapsUrl();

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      section.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="celebration-section"
      id="invitation-details"
      ref={sectionRef}
      aria-labelledby="celebration-title"
    >
      <div className="celebration-intro">
        <p className="celebration-kicker">
          <span aria-hidden="true" />
          The day, gathered in one place
          <MarigoldMark />
          <MangoLeafMark />
        </p>
        <h2 id="celebration-title">
          {formatEventCopy(eventInfo.content.celebrationHeading)}
        </h2>
        <p className="celebration-message">
          {formatEventCopy(eventInfo.content.celebrationMessage)}
        </p>
        <SafariSprig />
        <span className="celebration-edition" aria-hidden="true">
          A LITTLE WILD GATHERING &nbsp;·&nbsp; EST. WITH LOVE
        </span>
      </div>

      <div className="celebration-information">
        <div className="event-detail-grid">
          <article className="event-detail">
            <span className="event-detail-index" aria-hidden="true">
              01
            </span>
            <div className="event-detail-copy">
              <p className="event-detail-label">Date</p>
              <h3 className="event-detail-date">
                {dateParts ? (
                  <>
                    <span>{dateParts.weekday},</span>
                    <span>
                      {dateParts.month} {dateParts.day}, {dateParts.year}
                    </span>
                  </>
                ) : (
                  <span>{getBirthdayDisplayDate()}</span>
                )}
              </h3>
              <p className="event-detail-note">
                {dateParts ? "A day for little wonders" : "The date will be shared soon"}
              </p>
            </div>
          </article>

          <article className="event-detail">
            <span className="event-detail-index" aria-hidden="true">
              02
            </span>
            <div className="event-detail-copy">
              <p className="event-detail-label">Time</p>
              <h3>
                <span className="event-time-value">
                  {formatEventTime(
                    eventInfo.celebration.startTime24,
                    "Time to be announced",
                  )}
                  {isValidTime24(eventInfo.celebration.endTime24) &&
                    isValidTime24(eventInfo.celebration.startTime24) && (
                      <>
                        <span className="time-joiner"> to </span>
                        <span className="event-time-value">
                          {formatEventTime(eventInfo.celebration.endTime24, "")}
                        </span>
                      </>
                    )}
                </span>
              </h3>
              <p className="event-detail-note">
                {getEventTimeZoneLabel()
                  ? `Times shown in ${getEventTimeZoneLabel()}`
                  : isProvided(eventInfo.celebration.timeZone)
                    ? "The configured time zone is invalid"
                    : "Local event time"}
              </p>
            </div>
          </article>

          <article className="event-detail">
            <span className="event-detail-index" aria-hidden="true">
              03
            </span>
            <div className="event-detail-copy">
              <p className="event-detail-label">Location</p>
              <h3 className="event-venue">
                {isProvided(eventInfo.celebration.venue)
                  ? formatEventCopy(eventInfo.celebration.venue)
                  : "Venue details to be shared soon"}
              </h3>
              {getVenueAddress() && (
                <p className="event-detail-address">{getVenueAddress()}</p>
              )}
              {isProvided(eventInfo.celebration.demoNotice) && (
                <p className="event-detail-demo">
                  {formatEventCopy(eventInfo.celebration.demoNotice)}
                </p>
              )}
            </div>
          </article>

          <article className="event-detail">
            <span className="event-detail-index" aria-hidden="true">
              04
            </span>
            <div className="event-detail-copy">
              <p className="event-detail-label">Dress code</p>
              <h3>
                {isProvided(eventInfo.celebration.dressCode)
                  ? formatEventCopy(eventInfo.celebration.dressCode)
                  : "Dress code to be announced"}
              </h3>
              <p className="event-detail-note">A little note for the day</p>
            </div>
          </article>
        </div>

        <div className="celebration-actions">
          <p>Keep this little day close</p>
          <div className="event-action-links">
            <a
              className="event-action event-action-primary"
              href={buildCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarIcon />
              <span>Add to Google Calendar</span>
            </a>
            {mapsUrl ? (
              <a
                className="event-action event-action-secondary"
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapIcon />
                <span>Open location in Google Maps</span>
              </a>
            ) : null}
            {buildWhatsAppShareUrl("event") && (
              <a
                className="event-action event-action-secondary"
                href={buildWhatsAppShareUrl("event") ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                <span>Share event details</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function DirectionArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function DestinationPlaceholder({ mapUnavailable = false }: { mapUnavailable?: boolean }) {
  return (
    <div className="destination-placeholder">
      <svg viewBox="0 0 700 480" fill="none" aria-hidden="true">
        <path className="destination-map-land" d="M0 0h700v480H0z" />
        <path className="destination-map-track" d="M-25 375c111-12 117-102 241-102 85 0 93 71 185 71 91 0 94-111 181-111 53 0 88 35 143 21" />
        <path className="destination-map-track destination-map-track-secondary" d="M97-25c36 94 99 100 99 185 0 64-43 92-33 159 10 69 83 92 101 176" />
        <path className="destination-map-leaf" d="M552 125c-7-36 0-67 25-97 15 36 6 69-25 97Zm0-1c-29-28-57-32-90-18 25 29 56 34 90 18Z" />
        <path className="destination-map-leaf" d="M128 404c-5-26 1-48 18-68 11 26 5 50-18 68Zm0-1c-21-20-41-23-65-13 18 21 41 25 65 13Z" />
        <circle className="destination-map-dot" cx="368" cy="235" r="50" />
        <path className="destination-map-pin" d="M368 268s-27-28-27-48a27 27 0 1 1 54 0c0 20-27 48-27 48Z" />
        <circle className="destination-map-pin-center" cx="368" cy="220" r="8" />
        <path className="destination-map-caption" d="M310 319h116" />
      </svg>
      <span className="destination-placeholder-note">
        <span className="destination-placeholder-icon" aria-hidden="true">
          <LocationPinIcon />
        </span>
        <span>
          <strong>{mapUnavailable ? "Map preview unavailable" : "Your destination awaits"}</strong>
          <small>
            {mapUnavailable
              ? "Use the map links to open your configured location"
              : "Add a venue address or Google Maps link to see the way"}
          </small>
        </span>
      </span>
      <span className="destination-map-index" aria-hidden="true">
        THE WAY TO OUR LITTLE GATHERING
      </span>
    </div>
  );
}

function SafariDestination() {
  const sectionRef = useRef<HTMLElement>(null);
  const location = getVenueLocation();
  const { venue, venuePhotoUrl } = eventInfo.celebration;
  const venueAddress = getVenueAddress();
  const primaryVenuePhotoUrl = getSafeImageSource(venuePhotoUrl);
  const fallbackVenuePhotoUrl = getSafeImageSource(
    eventInfo.celebration.venuePhotoFallbackUrl,
  );
  const [venuePhotoFallbackActive, setVenuePhotoFallbackActive] = useState(
    !primaryVenuePhotoUrl && Boolean(fallbackVenuePhotoUrl),
  );
  const [venuePhotoUnavailable, setVenuePhotoUnavailable] = useState(false);
  const [mapPreviewUnavailable, setMapPreviewUnavailable] = useState(false);
  const safeVenuePhotoUrl = venuePhotoFallbackActive
    ? fallbackVenuePhotoUrl
    : primaryVenuePhotoUrl ?? fallbackVenuePhotoUrl;

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      section.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="destination-section"
      id="destination"
      ref={sectionRef}
      aria-labelledby="destination-title"
    >
      <header className="destination-heading">
        <p className="destination-kicker">
          <span aria-hidden="true" />
          A little place, a lot of love
        </p>
        <h2 id="destination-title">
          {formatEventCopy(eventInfo.content.locationHeading)}
        </h2>
        <p>{formatEventCopy(eventInfo.content.locationIntroduction)}</p>
      </header>

      <div className="destination-layout">
        <div className="destination-map-column">
          <div className={`destination-map-frame${location && !mapPreviewUnavailable ? " has-map" : ""}`}>
            {location && !mapPreviewUnavailable ? (
              <>
                <iframe
                  src={location.previewUrl}
                  title={`Google Maps preview for ${isProvided(venue) ? venue : "the celebration venue"}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  onError={() => setMapPreviewUnavailable(true)}
                />
                <a
                  className="destination-map-open"
                  href={location.mapUrl ?? location.directionsUrl ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${isProvided(venue) ? venue : "the celebration location"} in Google Maps`}
                >
                  <span>View Full Map</span>
                  <DirectionArrowIcon />
                </a>
                <span className="destination-map-location-label">
                  <LocationPinIcon />
                  <span>{isProvided(venue) ? formatEventCopy(venue) : "Celebration location"}</span>
                </span>
                <span className="destination-map-index" aria-hidden="true">
                  THE WAY TO OUR LITTLE GATHERING
                </span>
              </>
            ) : (
              <DestinationPlaceholder mapUnavailable={Boolean(location)} />
            )}
          </div>
          <p className="destination-map-caption">
            <span>Our little corner of the world</span>
            <span aria-hidden="true">· &nbsp; DESTINATION, TO BE DISCOVERED</span>
          </p>
        </div>

        <div className="destination-copy">
          <p className="destination-copy-kicker">
            <LocationPinIcon />
            The gathering place
          </p>
          <h3>          {isProvided(venue) ? formatEventCopy(venue) : "Our celebration venue"}</h3>

          {safeVenuePhotoUrl && !venuePhotoUnavailable && (
            <img
              className="destination-photo"
              src={safeVenuePhotoUrl}
              alt={`${formatEventCopy(venue)} venue`}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 680px) 86vw, (max-width: 1000px) 38vw, 32vw"
              onError={() => {
                if (
                  !venuePhotoFallbackActive &&
                  fallbackVenuePhotoUrl &&
                  safeVenuePhotoUrl !== fallbackVenuePhotoUrl
                ) {
                  setVenuePhotoFallbackActive(true);
                  return;
                }
                setVenuePhotoUnavailable(true);
              }}
            />
          )}

          <address className="destination-address">
            {venueAddress || "Venue address will be shared soon."}
          </address>

          <span className="destination-rule" aria-hidden="true" />
          <p className="destination-note">
            {formatEventCopy(eventInfo.content.locationNote)}
          </p>
          {isProvided(eventInfo.celebration.demoNotice) && (
            <p className="destination-demo-notice">
              {formatEventCopy(eventInfo.celebration.demoNotice)}
            </p>
          )}

          <div className="destination-actions">
            {location?.directionsUrl ? (
              <a
                className="destination-directions"
                href={location.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Get Directions</span>
                <DirectionArrowIcon />
              </a>
            ) : null}
            {location && buildWhatsAppShareUrl("location") && (
              <a
                className="destination-text-link"
                href={buildWhatsAppShareUrl("location") ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
              >
                Share location on WhatsApp
                <DirectionArrowIcon />
              </a>
            )}
          </div>
        </div>
      </div>
      <span className="destination-leaf destination-leaf-one" aria-hidden="true" />
      <span className="destination-leaf destination-leaf-two" aria-hidden="true" />
    </section>
  );
}

function GalleryArtwork({ variant }: { variant: GalleryFormat }) {
  return (
    <svg
      className={`gallery-artwork gallery-artwork-${variant}`}
      viewBox="0 0 640 520"
      fill="none"
      aria-hidden="true"
    >
      <circle className="gallery-art-sun" cx="472" cy="145" r="67" />
      <path
        className="gallery-art-hill gallery-art-hill-back"
        d="M0 350c95-66 177-74 266-31 80 38 151 44 230 1 57-31 98-30 144 1v199H0Z"
      />
      <path
        className="gallery-art-hill gallery-art-hill-front"
        d="M0 410c99-37 171-22 254 9 103 39 166 4 238-20 58-19 99-12 148 11v110H0Z"
      />
      <path
        className="gallery-art-branch"
        d="M96 423c13-71 15-135 4-210m3 116c-35-9-53-30-52-62 26 3 44 20 52 62Zm2-47c33-16 46-42 38-71-27 10-40 34-38 71Zm-6-52c-25-16-36-35-29-58 21 9 32 28 29 58Z"
      />
      <g className="gallery-art-elephant">
        <ellipse cx="350" cy="432" rx="91" ry="12" />
        <path d="M275 346c0-43 31-73 75-73h19c43 0 74 30 74 73v50h-32v-45h-22v45h-37v-45h-22v45h-31v-50Z" />
        <path d="M303 306c-37-21-69 2-68 42 1 29 18 51 46 54 16-25 23-58 22-96Z" />
        <path d="M349 308c0-32 22-56 53-56s53 24 53 56v69c0 37-22 61-53 61s-53-24-53-61Z" />
        <path d="M427 343c2 28 23 31 22 51-1 13-9 19-21 17-11-3-17-13-14-23 2-7 7-11 12-14-17 3-28-3-30-15-1-10 6-17 15-17 6 0 11 1 16 1Z" />
        <circle cx="434" cy="319" r="3.5" />
      </g>
      <path className="gallery-art-spark" d="M193 181v-14m0 53v-14m26-13h-14m-10 0h-14m30-19 9-9m-37 37 9-9" />
    </svg>
  );
}

function GalleryArrow({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {direction === "previous" ? (
        <path d="M20 12H5m6 6-6-6 6-6" />
      ) : (
        <path d="M4 12h15m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}

function GalleryCloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function BabyPhotoGallery() {
  const galleryMemories = [...eventInfo.gallery].sort(
    (first, second) => first.order - second.order,
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const [fallbackImages, setFallbackImages] = useState<string[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const openerIndex = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const isViewerOpen = selectedIndex !== null;
  const selectedMemory =
    selectedIndex === null ? null : galleryMemories[selectedIndex];

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const photos = section.querySelectorAll<HTMLElement>(".gallery-memory");

    if (!("IntersectionObserver" in window)) {
      section.classList.add("is-visible");
      photos.forEach((photo) => photo.classList.add("is-visible"));
      return;
    }

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
          sectionObserver.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    const photoObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    sectionObserver.observe(section);
    photos.forEach((photo) => photoObserver.observe(photo));

    return () => {
      sectionObserver.disconnect();
      photoObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isViewerOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const openingIndex = openerIndex.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (openingIndex !== null) {
        triggerRefs.current[openingIndex]?.focus();
      }
    };
  }, [isViewerOpen]);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setSelectedIndex((current) =>
          current === null ? null : (current + 1) % galleryMemories.length,
        );
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelectedIndex((current) =>
          current === null
            ? null
            : (current - 1 + galleryMemories.length) % galleryMemories.length,
        );
      } else if (event.key === "Tab") {
        const focusableElements =
          viewerRef.current?.querySelectorAll<HTMLButtonElement>("button:not([disabled])");
        const firstElement = focusableElements?.[0];
        const lastElement = focusableElements?.[focusableElements.length - 1];

        if (
          event.shiftKey &&
          (document.activeElement === firstElement ||
            document.activeElement === viewerRef.current)
        ) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const markImageAsFailed = (id: string) => {
    setFailedImages((current) =>
      current.includes(id) ? current : [...current, id],
    );
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;

    if (startX === null || endX === undefined || Math.abs(endX - startX) < 48) {
      return;
    }

    setSelectedIndex((current) => {
      if (current === null) {
        return null;
      }

      return endX < startX
        ? (current + 1) % galleryMemories.length
        : (current - 1 + galleryMemories.length) % galleryMemories.length;
    });
  };

  const showPrevious = () => {
    setSelectedIndex((current) =>
      current === null
        ? null
        : (current - 1 + galleryMemories.length) % galleryMemories.length,
    );
  };

  const showNext = () => {
    setSelectedIndex((current) =>
      current === null ? null : (current + 1) % galleryMemories.length,
    );
  };

  const renderMemoryVisual = (
    memory: (typeof galleryMemories)[number],
    eager = false,
  ) => {
    const primarySource = getSafeImageSource(memory.src);
    const fallbackSource = getSafeImageSource(memory.fallbackSrc);
    const fallbackActive =
      fallbackImages.includes(memory.id) || !primarySource;
    const source = fallbackActive ? fallbackSource : primarySource;
    const srcSet = getSafeImageSrcSet(memory.srcSet);
    if (source && !failedImages.includes(memory.id)) {
      return (
        <img
          className="gallery-photo"
          src={source}
          srcSet={
            !fallbackActive && srcSet ? srcSet : undefined
          }
          sizes={!fallbackActive && srcSet ? "(max-width: 680px) 90vw, 42vw" : undefined}
          alt={
            isProvided(memory.alt)
              ? formatEventCopy(memory.alt)
              : formatEventCopy(memory.caption)
          }
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => {
            if (!fallbackActive && fallbackSource) {
              setFallbackImages((current) =>
                current.includes(memory.id) ? current : [...current, memory.id],
              );
              return;
            }
            markImageAsFailed(memory.id);
          }}
        />
      );
    }

    return (
      <div
        className={`gallery-placeholder${failedImages.includes(memory.id) ? " is-image-unavailable" : ""}`}
        role="img"
        aria-label={
          failedImages.includes(memory.id)
            ? "Photograph unavailable. Replace its image URL in the gallery configuration."
            : "Photograph placeholder. Add an image URL in the gallery configuration."
        }
      >
        <GalleryArtwork variant={memory.format} />
        <span className="gallery-placeholder-note">
          <span className="gallery-placeholder-index">
            {String(galleryMemories.indexOf(memory) + 1).padStart(2, "0")}
          </span>
          <span>
            {failedImages.includes(memory.id)
            ? "Unavailable"
            : "Add photo"}
          </span>
        </span>
      </div>
    );
  };
  return (
    <section
      className="gallery-section"
      id="little-moments"
      ref={sectionRef}
      aria-labelledby="gallery-title"
    >
      <header className="gallery-heading">
        <p className="gallery-kicker">
          <span aria-hidden="true" />
          Little moments, treasured always
        </p>
        <h2 id="gallery-title">
          {formatEventCopy(eventInfo.content.galleryHeading)}
        </h2>
        <p className="gallery-introduction">
          {formatEventCopy(eventInfo.content.galleryIntroduction)}
        </p>
        {isProvided(eventInfo.content.galleryDemoNotice) && (
          <p className="gallery-demo-notice">
            {formatEventCopy(eventInfo.content.galleryDemoNotice)}
          </p>
        )}
      </header>

      {galleryMemories.length > 0 ? (
        <div className="gallery-layout">
          {galleryMemories.map((memory, index) => (
          <figure
            className={`gallery-memory gallery-memory-${memory.format}`}
            key={memory.id}
          >
            <button
              className="gallery-memory-open"
              type="button"
              onClick={() => {
                openerIndex.current = index;
                setSelectedIndex(index);
              }}
              aria-label={`Open photograph ${index + 1}: ${formatEventCopy(memory.caption)}`}
              ref={(element) => {
                triggerRefs.current[index] = element;
              }}
            >
              <span className="gallery-memory-visual">
                {renderMemoryVisual(memory)}
                <span className="gallery-view-mark" aria-hidden="true">
                  +
                </span>
              </span>
            </button>
            <figcaption className="gallery-caption">
              <span>{formatEventCopy(memory.caption)}</span>
              {isProvided(memory.date) && (
                <span>{formatEventCopy(memory.date)}</span>
              )}
            </figcaption>
            {getSafeHttpsUrl(memory.sourceUrl) && (
              <a
                className="gallery-photo-source"
                href={getSafeHttpsUrl(memory.sourceUrl)?.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {isProvided(memory.sourceLabel)
                  ? formatEventCopy(memory.sourceLabel)
                  : "View photo source"}
              </a>
            )}
          </figure>
          ))}
        </div>
      ) : (
        <div className="gallery-empty" role="status">
          <GalleryArtwork variant="landscape" />
          <p>No photographs have been added to the gallery yet.</p>
          <span>Add the family photographs in the gallery configuration.</span>
        </div>
      )}
      <p className="gallery-footnote">
        Each little moment, kept close.
        <span className="gallery-footnote-flourish" aria-hidden="true">✳</span>
      </p>

      {selectedMemory &&
        selectedIndex !== null &&
        createPortal(
        <div
          className="gallery-viewer"
          ref={viewerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedIndex(null);
            }
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="viewer-close"
            type="button"
            aria-label="Close photograph viewer"
            onClick={() => setSelectedIndex(null)}
            ref={closeButtonRef}
          >
            <GalleryCloseIcon />
          </button>
          <button
            className="viewer-navigation viewer-previous"
            type="button"
            aria-label="Previous photograph"
            onClick={showPrevious}
          >
            <GalleryArrow direction="previous" />
          </button>
          <figure className="viewer-figure" key={selectedMemory.id}>
            <div className={`viewer-image viewer-image-${selectedMemory.format}`}>
              {renderMemoryVisual(selectedMemory, true)}
            </div>
            <figcaption className="viewer-caption">
              <span>{formatEventCopy(selectedMemory.caption)}</span>
              {isProvided(selectedMemory.date) && (
                <span>{formatEventCopy(selectedMemory.date)}</span>
              )}
            </figcaption>
            <p className="viewer-counter" aria-live="polite">
              {String(selectedIndex + 1).padStart(2, "0")} &nbsp;/&nbsp;{" "}
              {String(galleryMemories.length).padStart(2, "0")}
            </p>
          </figure>
          <button
            className="viewer-navigation viewer-next"
            type="button"
            aria-label="Next photograph"
            onClick={showNext}
          >
            <GalleryArrow direction="next" />
          </button>
          <span className="viewer-keyboard-hint" aria-hidden="true">
            USE THE ARROW KEYS TO WANDER
          </span>
        </div>,
        document.body,
      )}
    </section>
  );
}

function SurpriseGiftIllustration({
  isOpening,
  isOpen,
}: {
  isOpening: boolean;
  isOpen: boolean;
}) {
  return (
    <svg
      className={`surprise-gift-art${isOpening ? " is-opening" : ""}${isOpen ? " is-open" : ""}`}
      viewBox="0 0 520 380"
      fill="none"
      role="img"
      aria-label={isOpen ? "The birthday surprise gift is open" : "A closed illustrated birthday gift"}
    >
      <ellipse className="gift-ground-shadow" cx="260" cy="324" rx="131" ry="15" />
      <g className="gift-botanical gift-botanical-left" aria-hidden="true">
        <path d="M119 291c-3-50-1-101 18-145" />
        <path d="M133 213c-25-3-40-18-39-43 22 3 35 17 39 43Zm7-27c23-9 33-27 28-49-20 7-30 22-28 49Zm-14 66c-25-2-39-16-40-39 22 3 35 16 40 39Z" />
      </g>
      <g className="gift-botanical gift-botanical-right" aria-hidden="true">
        <path d="M401 288c5-45 3-81-11-119" />
        <path d="M393 222c23-5 35-20 32-43-21 4-33 18-32 43Zm-8-28c-21-9-29-26-23-46 18 7 27 21 23 46Zm17 63c23-3 35-17 33-38-20 4-32 17-33 38Z" />
      </g>
      <path className="gift-light" d="M260 78v-20m0 72V110m26-26h-20m-12 0h-20m45-18 10-10m-43 43 10-10" />
      <g className="gift-reveal-sparkles" aria-hidden="true">
        <path d="M189 142v-16m0 48v-16m24-8h-16m-16 0h-16m36-20 9-9m-37 37 9-9" />
        <path d="M332 124v-13m0 39v-13m20-6h-13m-14 0h-13m29-16 7-7m-30 30 7-7" />
        <circle cx="221" cy="119" r="3" />
        <circle cx="303" cy="111" r="2.5" />
        <circle cx="356" cy="154" r="2" />
      </g>
      <g className="gift-box-body">
        <path className="gift-box-side" d="M164 213h192v103H164z" />
        <path className="gift-box-front" d="M164 213h192v103H164z" />
        <path className="gift-box-front-inset" d="M181 230h158v68H181z" />
        <path className="gift-box-ribbon" d="M245 213h31v103h-31z" />
        <path className="gift-box-side-ribbon" d="M356 213h-31v103h31z" />
        <path className="gift-box-base" d="M152 311h215v17H152z" />
        <path className="gift-box-base-line" d="M162 319h195" />
        <path className="gift-box-sparkle" d="m205 260 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Zm102 7 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" />
      </g>
      <g className="gift-ribbon-bow" aria-hidden="true">
        <path className="gift-bow-loop gift-bow-loop-left" d="M258 204c-28-3-40-25-25-34 12-8 26 10 29 30" />
        <path className="gift-bow-loop gift-bow-loop-right" d="M262 200c4-26 20-40 31-29 12 12-3 29-29 35" />
        <circle className="gift-bow-knot" cx="260" cy="202" r="8" />
      </g>
      <g className="gift-box-lid">
        <path className="gift-lid-top" d="m144 183 116-21 116 21-116 24-116-24Z" />
        <path className="gift-lid-front" d="m144 183 116 24v24l-116-24v-24Z" />
        <path className="gift-lid-side" d="m260 207 116-24v24l-116 24v-24Z" />
        <path className="gift-lid-ribbon-top" d="m245 165 30-5 31 6-31 6-30-7Z" />
        <path className="gift-lid-ribbon-front" d="m245 165 30 7v31l-30-7v-31Z" />
        <path className="gift-lid-ribbon-side" d="m275 172 31-6v31l-31 6v-31Z" />
      </g>
    </svg>
  );
}

function BirthdaySurprise() {
  const [phase, setPhase] = useState<
    "closed" | "opening" | "open" | "closing"
  >("closed");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundMessage, setSoundMessage] = useState("Sound is off");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const openingLock = useRef(false);
  const reduceMotion = useRef(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotion.current = preference.matches;
    const updatePreference = (event: MediaQueryListEvent) => {
      reduceMotion.current = event.matches;
    };

    preference.addEventListener("change", updatePreference);

    return () => {
      preference.removeEventListener("change", updatePreference);
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
      if (audioContextRef.current) {
        void audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  const playBirthdayChime = () => {
    const AudioContextConstructor = window.AudioContext;
    if (!AudioContextConstructor) {
      setSoundEnabled(false);
      setSoundMessage("Birthday sound is not available in this browser");
      return;
    }

    const audioContext = audioContextRef.current ?? new AudioContextConstructor();
    audioContextRef.current = audioContext;
    if (audioContext.state === "suspended") {
      void audioContext.resume().catch(() => {
        setSoundEnabled(false);
        setSoundMessage("Birthday sound could not start; the surprise will still open");
      });
    }

    const startAt = audioContext.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
      const start = startAt + index * 0.16;
      const oscillator = audioContext.createOscillator();
      const volume = audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      volume.gain.setValueAtTime(0.0001, start);
      volume.gain.exponentialRampToValueAtTime(0.09, start + 0.025);
      volume.gain.exponentialRampToValueAtTime(0.0001, start + 0.28);
      oscillator.connect(volume);
      volume.connect(audioContext.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.3);
    });
  };

  const beginOpening = () => {
    if (openingLock.current) {
      return;
    }

    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    openingLock.current = true;
    setPhase("opening");
    if (soundEnabled) {
      playBirthdayChime();
    }

    if (reduceMotion.current) {
      setPhase("open");
      openingLock.current = false;
      timerRef.current = null;
      return;
    }

    timerRef.current = setTimeout(() => {
      setPhase("open");
      openingLock.current = false;
      timerRef.current = null;
    }, 1350);
  };

  const closeSurprise = () => {
    if (openingLock.current) {
      return;
    }
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    openingLock.current = true;
    setPhase("closing");
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      openingLock.current = false;
      setPhase("closed");
      const invitationHeading = document.getElementById("gift-title");
      invitationHeading?.focus({ preventScroll: true });
      invitationHeading?.scrollIntoView({
        behavior: reduceMotion.current ? "auto" : "smooth",
        block: "start",
      });
    }, reduceMotion.current ? 0 : 650);
  };

  const replay = () => {
    if (openingLock.current) {
      return;
    }

    openingLock.current = true;
    setPhase("closed");
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      openingLock.current = false;
      beginOpening();
    }, 50);
  };

  const isOpening = phase === "opening";
  const isOpen = phase === "open";
  const isClosing = phase === "closing";

  return (
    <section
      className="surprise-section"
      id="little-surprise"
      aria-labelledby="surprise-title"
    >
      <div className="surprise-backdrop-decor" aria-hidden="true">
        <span className="surprise-cloud surprise-cloud-one" />
        <span className="surprise-cloud surprise-cloud-two" />
        <span className="surprise-balloon surprise-balloon-one" />
        <span className="surprise-balloon surprise-balloon-two" />
        <span className="surprise-flower surprise-flower-one" />
        <span className="surprise-flower surprise-flower-two" />
        <span className="surprise-star surprise-star-one">✦</span>
        <span className="surprise-star surprise-star-two">✧</span>
        <span className="surprise-star surprise-star-three">✦</span>
        <span className="surprise-backdrop-leaf surprise-backdrop-leaf-left" />
        <span className="surprise-backdrop-leaf surprise-backdrop-leaf-right" />
      </div>
      <header className="surprise-heading">
        <p className="surprise-kicker">
          <span aria-hidden="true" />
          A Little Birthday Magic for You
        </p>
        <h2 id="surprise-title">A Special Birthday Surprise Awaits!</h2>
        <p>
          It&apos;s your special day, {getBabyName()}! We&apos;ve prepared a little surprise
          filled with happiness, smiles and lots of love. Come on, let&apos;s unwrap
          the magic!
        </p>
      </header>

      <div className={`surprise-experience${isOpen ? " is-open" : ""}`}>
        <div className="surprise-scene">
          <div className="surprise-gift-stage">
            <span className="surprise-aura" aria-hidden="true" />
            <span className="surprise-leaf surprise-leaf-one" aria-hidden="true" />
            <span className="surprise-leaf surprise-leaf-two" aria-hidden="true" />
            <span className="surprise-animal surprise-animal-elephant" aria-hidden="true">
              <SafariCompanion animal="elephant" />
            </span>
            <span className="surprise-animal surprise-animal-lion" aria-hidden="true">
              <SafariCompanion animal="lion" />
            </span>
            <span className="surprise-animal surprise-animal-giraffe" aria-hidden="true">
              <SafariCompanion animal="giraffe" />
            </span>
            <span className="surprise-animal surprise-animal-monkey" aria-hidden="true">
              <SafariCompanion animal="monkey" />
            </span>
            <span className="surprise-animal surprise-animal-toucan" aria-hidden="true">
              <SafariCompanion animal="toucan" />
            </span>
            <SurpriseGiftIllustration isOpening={isOpening} isOpen={isOpen} />
            <div className={`surprise-confetti${isOpening || isOpen ? " is-visible" : ""}`} aria-hidden="true">
              {Array.from({ length: 10 }, (_, index) => (
                <span className={`surprise-confetti-piece piece-${index + 1}`} key={index} />
              ))}
              <span className="surprise-star-piece star-piece-one">✦</span>
              <span className="surprise-star-piece star-piece-two">✧</span>
              <span className="surprise-star-piece star-piece-three">✦</span>
              <span className="surprise-star-piece star-piece-four">✧</span>
            </div>
          </div>
          <p className="surprise-scene-caption" aria-live="polite">
            {isOpen
              ? "A little box full of birthday happiness!"
              : isOpening
                ? "Unwrapping a little magic…"
                : "A little box full of birthday happiness!"}
          </p>
        </div>

        <div
          className="surprise-reveal"
          aria-hidden={!isOpen}
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="surprise-reveal-kicker">
            <span aria-hidden="true">✳</span> A birthday note for you
          </p>
          <p className="surprise-birthday-greeting">Happy Birthday, {getBabyName()}!</p>
          <h3>Surprise, Little Explorer!</h3>
          <p className="surprise-reveal-message">
            Today is all about you! May your birthday be filled with endless
            smiles, exciting adventures, beautiful memories and lots of love.
            Have the most wonderful birthday!
          </p>
          <p className="surprise-signature">With love, always</p>
        </div>
      </div>

      <div className="surprise-controls">
        <div className="surprise-sound-control">
          <button
            className="surprise-sound-toggle"
            type="button"
            aria-pressed={soundEnabled}
            onClick={() => {
              const nextEnabled = !soundEnabled;
              setSoundEnabled(nextEnabled);
              setSoundMessage(
                nextEnabled
                  ? "A gentle birthday chime will play when you open the gift"
                  : "Sound is off",
              );
            }}
          >
            <span aria-hidden="true">{soundEnabled ? "♫" : "♪"}</span>
            {soundEnabled ? "Sound on" : "Sound off"}
          </button>
          <span className="surprise-sound-status" role="status" aria-live="polite">
            {soundMessage}
          </span>
        </div>
        <div className="surprise-actions">
          {isOpen ? (
            <>
              <button
                className="surprise-button surprise-replay"
                type="button"
                onClick={replay}
              >
                <span aria-hidden="true">↻</span>
                Celebrate Again
              </button>
              <button
                className="surprise-button surprise-back"
                type="button"
                onClick={closeSurprise}
              >
                <span aria-hidden="true">←</span>
                Back to Invitation
              </button>
            </>
          ) : (
            <button
              className="surprise-button"
              type="button"
              onClick={beginOpening}
              disabled={isOpening || isClosing || openingLock.current}
              aria-label={
                isOpening
                  ? "Opening your birthday surprise"
                  : isClosing
                    ? "Closing your birthday surprise"
                    : "Open Your Surprise"
              }
              aria-busy={isOpening || isClosing || openingLock.current}
            >
              <span>
                {isOpening
                  ? "A birthday surprise is opening…"
                  : isClosing
                    ? "Closing the surprise…"
                    : "Open Your Surprise"}
              </span>
              {!isOpening && <span className="surprise-button-mark" aria-hidden="true">+</span>}
            </button>
          )}
        </div>
      </div>
      <p className="surprise-signoff">
        Made with love, just for our favourite little explorer.
      </p>
    </section>
  );
}

function SafariCompanion({ animal }: { animal: JungleAnimal }) {
  return (
    <svg
      className={`journey-companion journey-companion-${animal}`}
      viewBox="0 0 52 52"
      fill="none"
      aria-hidden="true"
    >
      {animal === "elephant" && (
        <>
          <path d="M12 25c0-9 6-15 14-15s14 6 14 15v11H12V25Z" />
          <path d="M14 20C5 15 3 28 8 34c2 2 5 2 7 0m21-14c9-5 11 8 6 14-2 2-5 2-7 0" />
          <path className="companion-trunk" d="M30 27c0 7 8 8 7 14-.5 4-5 5-8 2-2-2-2-5 0-7" />
          <path d="m22 27 .1 0m12 0 .1 0" />
          <path className="companion-smile" d="M24 33q4 3 8 0" />
        </>
      )}
      {animal === "lion" && (
        <>
          <path d="M26 6c3-4 9-2 9 3 6-2 10 3 7 8 6 3 5 10 0 12 2 6-3 10-8 8-4 5-10 4-12 0-6 2-10-3-7-8-6-3-5-10 0-12-2-6 3-10 8-8 1-2 2-3 3-3Z" />
          <circle cx="26" cy="25" r="12" />
          <g className="companion-eyes">
            <path d="M21 24h.1m10 0h.1" />
          </g>
          <path className="companion-smile" d="m23 29 3 2 3-2m-3 0v3" />
        </>
      )}
      {animal === "giraffe" && (
        <>
          <path d="M19 40V26c0-6 3-10 7-10s7 4 7 10v14H19Z" />
          <g className="companion-giraffe-head">
            <path d="M19 22c0-7 3-11 7-11s7 4 7 11v4H19v-4Z" />
            <path d="m20 15-5-5 2 9m18-4 5-5-2 9M22 12V6m8 6V6" />
            <path d="M22 21h.1m8 0h.1m-6 4q2 2 4 0" />
            <circle cx="22" cy="16" r="1.5" />
            <circle cx="31" cy="28" r="1.5" />
          </g>
          <path d="M22 40v5m10-5v5" />
        </>
      )}
      {animal === "monkey" && (
        <>
          <path className="companion-vine" d="M26 3v10m0-4c-4-3-7-2-9 0" />
          <path d="M18 22c-6-4-9 2-5 6m21-6c6-4 9 2 5 6" />
          <circle cx="26" cy="22" r="11" />
          <path d="M19 20c0-4 3-7 7-7s7 3 7 7v5c0 4-3 7-7 7s-7-3-7-7v-5Z" />
          <path className="companion-eyes" d="M22 21h.1m8 0h.1" />
          <path className="companion-smile" d="M23 27q3 3 6 0" />
          <path d="M20 33c-4 2-5 6-4 10m16-10c4 2 5 6 4 10m-16-2q6-4 12 0" />
        </>
      )}
      {animal === "zebra" && (
        <>
          <path d="M16 17 11 9l9 4m16 4 5-8-9 4" />
          <path d="M16 23c0-8 4-13 10-13s10 5 10 13v13H16V23Z" />
          <path d="m18 15 5 4m11-4-5 4m-12 2 5 4m13-4-5 4m-13 2 5 4m13-4-5 4" />
          <path className="companion-eyes" d="M22 24h.1m8 0h.1" />
          <path className="companion-smile" d="M23 30q3 2 6 0" />
          <path d="M20 36v8m12-8v8" />
        </>
      )}
      {animal === "toucan" && (
        <>
          <path d="M17 21c0-8 5-13 12-13 6 0 10 5 10 12v15H17V21Z" />
          <path d="M35 17c10-4 15 1 11 8-3 5-8 7-14 6 4-4 5-9 3-14Z" />
          <path d="M19 18c-2-5 1-9 5-10" />
          <path className="companion-eyes" d="M29 19h.1" />
          <path d="M24 35v8m11-8v8" />
          <path className="companion-beak-detail" d="m38 24 6-2" />
        </>
      )}
    </svg>
  );
}

function MilestoneCard({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <li
      className={`story-milestone${index % 2 === 0 ? " is-top" : " is-bottom"}`}
      data-milestone-number={number}
    >
      <article className="milestone-copy" aria-labelledby={`milestone-title-${number}`}>
        <span className="milestone-marker" aria-hidden="true">
          <SafariCompanion animal={milestone.companion} />
        </span>
        <div className="milestone-content">
          <span className="milestone-number">{number}</span>
          {isProvided(milestone.date) && (
            <p className="milestone-date">{formatEventCopy(milestone.date)}</p>
          )}
          <h4 id={`milestone-title-${number}`}>
            {isProvided(milestone.title)
              ? formatEventCopy(milestone.title)
              : "A little memory"}
          </h4>
          {isProvided(milestone.description) && (
            <p className="milestone-description">
              {formatEventCopy(milestone.description)}
            </p>
          )}
        </div>
      </article>
    </li>
  );
}

function BirthdayCountdown() {
  const targetTimestamp = useRef<number | null>(getBirthdayTimestamp());
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(() =>
    getSecondsUntilBirthday(targetTimestamp.current),
  );

  useEffect(() => {
    const target = targetTimestamp.current;

    if (target === null) {
      setSecondsRemaining(null);
      return;
    }

    let timerId: number | null = null;
    const updateCountdown = () => {
      const remaining = getSecondsUntilBirthday(target);
      setSecondsRemaining(remaining);
      if (remaining === 0 && timerId !== null) {
        window.clearInterval(timerId);
        timerId = null;
      }
    };

    updateCountdown();
    if (target <= Date.now()) {
      return;
    }

    timerId = window.setInterval(updateCountdown, 1000);
    return () => {
      if (timerId !== null) {
        window.clearInterval(timerId);
      }
    };
  }, []);

  const isConfigured = secondsRemaining !== null;
  const isComplete = secondsRemaining === 0;
  const units =
    secondsRemaining === null
      ? [
          { key: "days", label: "Days", value: "—" },
          { key: "hours", label: "Hours", value: "—" },
          { key: "minutes", label: "Minutes", value: "—" },
          { key: "seconds", label: "Seconds", value: "—" },
        ]
      : [
          {
            key: "days",
            label: "Days",
            value: String(Math.floor(secondsRemaining / 86400)).padStart(2, "0"),
          },
          {
            key: "hours",
            label: "Hours",
            value: String(Math.floor((secondsRemaining % 86400) / 3600)).padStart(2, "0"),
          },
          {
            key: "minutes",
            label: "Minutes",
            value: String(Math.floor((secondsRemaining % 3600) / 60)).padStart(2, "0"),
          },
          {
            key: "seconds",
            label: "Seconds",
            value: String(secondsRemaining % 60).padStart(2, "0"),
          },
        ];

  return (
    <section
      className="countdown-section"
      id="countdown"
      aria-labelledby="countdown-title"
    >
      <header className="countdown-heading">
        <p className="countdown-kicker">
          <span aria-hidden="true" />
          A little more to go
          <span aria-hidden="true" />
        </p>
        <h2 id="countdown-title">
          {formatEventCopy(eventInfo.content.countdownHeading)}
        </h2>
        <p>{formatEventCopy(eventInfo.content.countdownIntroduction)}</p>
      </header>

      <div className="countdown-display">
        <span className="countdown-companion countdown-companion-left" aria-hidden="true">
          <SafariCompanion animal="giraffe" />
        </span>
        <div
          className="countdown-units"
          role="timer"
          aria-label={
            isConfigured
              ? "Time remaining until the birthday celebration"
              : "Countdown unavailable until the event date and time are configured"
          }
        >
          {units.map((unit) => (
            <div className={`countdown-unit countdown-unit-${unit.key}`} key={unit.key}>
              <span className="countdown-number" aria-label={`${unit.value} ${unit.label}`}>
                {unit.value}
              </span>
              <span className="countdown-unit-label">{unit.label}</span>
            </div>
          ))}
        </div>
        <span className="countdown-companion countdown-companion-right" aria-hidden="true">
          <SafariCompanion animal="elephant" />
        </span>
      </div>

      <p className="countdown-status" aria-live="polite">
        {isComplete
          ? "The big day is here! We can’t wait to celebrate with you."
          : isConfigured
          ? `${getBabyName()}'s birthday adventure is on its way${
              isValidTimeZone(eventInfo.celebration.timeZone)
                ? ` (${getEventTimeZoneLabel()})`
                : " — shown in this device’s local time zone"
            }.`
          : "Add a valid birthday date and start time. An event time zone keeps the countdown consistent for guests."}
      </p>

      <span className="countdown-botanical countdown-botanical-left" aria-hidden="true" />
      <span className="countdown-botanical countdown-botanical-right" aria-hidden="true" />
    </section>
  );
}

function BabysStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const storyPhotoUrl = getSafeImageSource(eventInfo.baby.storyPhotoUrl);
  const storyPhotoFallbackUrl = getSafeImageSource(
    eventInfo.baby.storyPhotoFallbackUrl,
  );
  const [storyPhotoSource, setStoryPhotoSource] = useState<string | null>(
    storyPhotoUrl ?? storyPhotoFallbackUrl,
  );
  const [storyFallbackAttempted, setStoryFallbackAttempted] = useState(
    !storyPhotoUrl && Boolean(storyPhotoFallbackUrl),
  );

  const handleStoryPhotoError = () => {
    if (!storyFallbackAttempted && storyPhotoFallbackUrl) {
      setStoryFallbackAttempted(true);
      setStoryPhotoSource(storyPhotoFallbackUrl);
      return;
    }

    setStoryPhotoSource(null);
  };

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const milestones = section.querySelectorAll<HTMLElement>(".story-milestone");

    if (!("IntersectionObserver" in window)) {
      section.classList.add("is-visible");
      milestones.forEach((milestone) => milestone.classList.add("is-visible"));
      return;
    }

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
          sectionObserver.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    const milestoneObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
    );

    sectionObserver.observe(section);
    milestones.forEach((milestone) => milestoneObserver.observe(milestone));

    return () => {
      sectionObserver.disconnect();
      milestoneObserver.disconnect();
    };
  }, []);

  return (
    <section
      className="story-section"
      id="little-story"
      ref={sectionRef}
      aria-labelledby="story-title"
    >
      <header className="story-heading">
        <p className="story-kicker">
          <span aria-hidden="true" />
          A little life, a thousand stories
        </p>
        <h2 id="story-title">
          {formatEventCopy(eventInfo.content.storyHeading)}
        </h2>
        <p className="story-introduction">
          {formatEventCopy(eventInfo.content.storyIntroduction)}
        </p>
      </header>

      <div className="story-portrait-layout">
        <figure className="story-portrait">
          <div className="story-photo-frame">
            {storyPhotoSource ? (
              <img
                className="story-photo"
                src={storyPhotoSource}
                srcSet={
                  storyPhotoSource === storyPhotoUrl
                    ? getSafeImageSrcSet(eventInfo.baby.storyPhotoSrcSet) || undefined
                    : undefined
                }
                alt={
                  isProvided(eventInfo.baby.storyPhotoAlt)
                    ? formatEventCopy(eventInfo.baby.storyPhotoAlt)
                    : `A photograph of ${getBabyName()}`
                }
                loading="lazy"
                decoding="async"
                sizes="(max-width: 680px) 86vw, (max-width: 1000px) 42vw, 36vw"
                onError={handleStoryPhotoError}
              />
            ) : (
              <div className="story-photo-placeholder" role="img" aria-label="Baby photograph placeholder">
                <svg viewBox="0 0 360 440" fill="none" aria-hidden="true">
                  <circle cx="270" cy="112" r="48" />
                  <path d="M0 290c70-56 134-62 202-28 55 27 101 21 158-9v187H0V290Z" />
                  <path d="M0 338c64-30 123-27 188-1 67 27 114 20 172-5v108H0V338Z" />
                  <path d="M74 315c14-51 15-93 5-140" />
                  <path d="M80 247c-30-6-44-25-41-51 23 2 38 18 41 51Zm-1-38c25-12 35-33 28-55-20 8-30 25-28 55Z" />
                  <path d="M126 287c0-29 22-52 51-52s51 23 51 52v60h-27v-47h-18v47h-23v-47h-18v47h-16v-60Z" />
                  <path d="M142 263c-24-15-45 0-44 25 0 20 13 34 31 36m73-61c24-15 45 0 44 25 0 20-13 34-31 36" />
                  <path d="M185 280c0 16 17 18 16 31-1 9-9 13-16 8m-14-31h.1m24 0h.1" />
                  <path d="M97 390h166" />
                </svg>
                <span className="photo-placeholder-label">
                  <span className="photo-placeholder-mark" aria-hidden="true">+</span>
                  Add a favorite photograph
                </span>
              </div>
            )}
          </div>
          <figcaption>
            <span>
              {isProvided(eventInfo.baby.storyPhotoCaption)
                ? eventInfo.baby.storyPhotoCaption
                : "A little moment"}
            </span>
            {getSafeHttpsUrl(eventInfo.baby.storyPhotoSourceUrl) && (
              <a
                href={getSafeHttpsUrl(eventInfo.baby.storyPhotoSourceUrl)?.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {isProvided(eventInfo.baby.storyPhotoSourceLabel)
                  ? eventInfo.baby.storyPhotoSourceLabel
                  : "View photo source"}
              </a>
            )}
          </figcaption>
          <span className="portrait-leaf portrait-leaf-one" aria-hidden="true" />
          <span className="portrait-leaf portrait-leaf-two" aria-hidden="true" />
        </figure>

        <div className="story-personal">
          <p className="story-personal-kicker">Our little wonder</p>
          <h3>{getBabyName()}</h3>
          <div className="story-facts">
            <p>
              <span>Born</span>
              <strong>
                {isProvided(eventInfo.baby.birthDate)
                  ? eventInfo.baby.birthDate
                  : "To be shared"}
              </strong>
            </p>
            <p>
              <span>Today</span>
              <strong>
                {isProvided(eventInfo.baby.age)
                  ? eventInfo.baby.age
                  : "Age to be shared"}
              </strong>
            </p>
          </div>
          <span className="story-personal-rule" aria-hidden="true" />
          <p className="parents-message">
            {formatEventCopy(eventInfo.baby.parentsMessage)}
          </p>
          <p className="parents-signature">With all our love</p>
          <span className="story-safari-stamp" aria-hidden="true">
            <SafariCompanion animal="elephant" />
          </span>
        </div>
      </div>

      <div className="journey-heading">
        <p className="story-kicker">
          <span aria-hidden="true" />
          Little by little, day by day
        </p>
        <h3>{getBabyName()}&apos;s Little Milestones</h3>
      </div>

      <ol className="story-timeline" aria-label="The little explorer's milestones">
        {eventInfo.milestones.map((milestone, index) => (
          <MilestoneCard
            key={index}
            milestone={milestone}
            index={index}
          />
        ))}
      </ol>
      <p className="journey-footnote">The smallest moments become our favorite stories.</p>
    </section>
  );
}

const giftCategories: Array<"All" | GiftCategory> = [
  "All",
  "Toys",
  "Books",
  "Clothing",
  "Learning & Development",
  "Keepsakes",
  "Surprise Gifts",
];

function GiftCorner() {
  const [activeCategory, setActiveCategory] = useState<"All" | GiftCategory>(
    "All",
  );
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const [fallbackImages, setFallbackImages] = useState<string[]>([]);
  const gifts = eventInfo.gifts.suggestions.filter(
    (gift) =>
      gift.visible &&
      (activeCategory === "All" || gift.category === activeCategory),
  );
  const registryUrl = getSafeHttpsUrl(eventInfo.gifts.registryUrl);

  return (
    <section
      className="gift-section"
      id="little-gifts"
      aria-labelledby="gift-title"
    >
      <header className="gift-heading">
        <p className="gift-kicker"><span aria-hidden="true" />A thoughtful little collection</p>
        <h2 id="gift-title" tabIndex={-1}>{formatEventCopy(eventInfo.content.giftHeading)}</h2>
        <p>{formatEventCopy(eventInfo.content.giftIntroduction)}</p>
      </header>

      <div className="gift-toolbar">
        <div className="gift-filters" role="group" aria-label="Filter gift ideas">
          {giftCategories.map((category) => (
            <button
              className={`gift-filter${activeCategory === category ? " is-active" : ""}`}
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <p className="gift-optional-note">
          {formatEventCopy(eventInfo.content.giftOptionalMessage)}
        </p>
      </div>

      {gifts.length > 0 ? (
        <div className="gift-collection" aria-live="polite">
          {gifts.map((gift, index) => {
            const imageUrl = getSafeImageSource(gift.imageUrl);
            const fallbackImageUrl = getSafeImageSource(
              gift.fallbackImageUrl ?? "",
            );
            const secondaryImageUrl = getSafeImageSource(
              gift.secondaryImageUrl ?? "",
            );
            const fallbackSecondaryImageUrl = getSafeImageSource(
              gift.fallbackSecondaryImageUrl ?? "",
            );
            const imageFallbackActive =
              fallbackImages.includes(gift.id) || !imageUrl;
            const displayedImageUrl = imageFallbackActive
              ? fallbackImageUrl
              : imageUrl ?? fallbackImageUrl;
            const secondaryFallbackId = `${gift.id}-secondary`;
            const secondaryFallbackActive =
              fallbackImages.includes(secondaryFallbackId) || !secondaryImageUrl;
            const displayedSecondaryImageUrl = secondaryFallbackActive
              ? fallbackSecondaryImageUrl
              : secondaryImageUrl ?? fallbackSecondaryImageUrl;
            const imageSourceUrl = getSafeHttpsUrl(gift.imageSourceUrl);
            const secondaryImageSourceUrl = getSafeHttpsUrl(
              gift.secondaryImageSourceUrl ?? "",
            );
            const productUrl = getSafeHttpsUrl(gift.productUrl);
            const hasImage =
              displayedImageUrl !== null && !failedImages.includes(gift.id);
            const hasSecondaryImage =
              displayedSecondaryImageUrl !== null &&
              !failedImages.includes(secondaryFallbackId);

            return (
              <article className="gift-item" key={gift.id}>
                <div
                  className={`gift-artwork${hasImage && hasSecondaryImage ? " gift-artwork-has-pair" : ""}`}
                >
                  {hasImage ? (
                    <>
                      <img
                        src={displayedImageUrl}
                        alt={
                          isProvided(gift.imageAlt)
                            ? formatEventCopy(gift.imageAlt)
                            : formatEventCopy(gift.title)
                        }
                        loading="lazy"
                        decoding="async"
                        onError={() => {
                          if (
                            !imageFallbackActive &&
                            fallbackImageUrl &&
                            displayedImageUrl !== fallbackImageUrl
                          ) {
                            setFallbackImages((current) =>
                              current.includes(gift.id)
                                ? current
                                : [...current, gift.id],
                            );
                            return;
                          }
                          setFailedImages((current) =>
                            current.includes(gift.id)
                              ? current
                              : [...current, gift.id],
                          );
                        }}
                      />
                      {hasSecondaryImage && displayedSecondaryImageUrl && (
                        <img
                          className="gift-secondary-photo"
                          src={displayedSecondaryImageUrl}
                          alt={
                            isProvided(gift.secondaryImageAlt ?? "")
                              ? gift.secondaryImageAlt
                              : formatEventCopy(gift.title)
                          }
                          loading="lazy"
                          decoding="async"
                          onError={() => {
                            if (
                              !secondaryFallbackActive &&
                              fallbackSecondaryImageUrl &&
                              displayedSecondaryImageUrl !== fallbackSecondaryImageUrl
                            ) {
                              setFallbackImages((current) =>
                                current.includes(secondaryFallbackId)
                                  ? current
                                  : [...current, secondaryFallbackId],
                              );
                              return;
                            }
                            setFailedImages((current) =>
                              current.includes(secondaryFallbackId)
                                ? current
                                : [...current, secondaryFallbackId],
                            );
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <div
                      className={`gift-artwork-placeholder gift-artwork-placeholder--${gift.id}`}
                      role="img"
                      aria-label={`${gift.category} demo photo unavailable`}
                    >
                      <span>{gift.category}</span>
                      <small>Demo photo unavailable</small>
                    </div>
                  )}
                  <span className="gift-index">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="gift-artwork-credit">
                  <span>Illustrative demo photograph{hasSecondaryImage ? "s" : ""}</span>
                  <span className="gift-photo-sources">
                    {imageSourceUrl && (
                      <a
                        href={imageSourceUrl.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {isProvided(gift.imageSourceLabel)
                          ? gift.imageSourceLabel
                          : "Photo source"}
                      </a>
                    )}
                    {hasSecondaryImage && secondaryImageSourceUrl && (
                      <a
                        href={secondaryImageSourceUrl.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {isProvided(gift.secondaryImageSourceLabel ?? "")
                          ? gift.secondaryImageSourceLabel
                          : "Second photo source"}
                      </a>
                    )}
                  </span>
                </div>
                <div className="gift-item-copy">
                  <p className="gift-category-label">{gift.category}</p>
                  <h3>
                    {isProvided(gift.title)
                      ? formatEventCopy(gift.title)
                      : "A little gift idea"}
                  </h3>
                  {isProvided(gift.description) && (
                    <p>{formatEventCopy(gift.description)}</p>
                  )}
                  {productUrl ? (
                    <a
                      className="gift-view-link"
                      href={productUrl.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Gift <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <button
                      className="gift-view-link is-unavailable"
                      type="button"
                      disabled
                      aria-label={`${gift.title || "Gift"} link not configured`}
                    >
                      View Gift <span aria-hidden="true">↗</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="gift-empty">
          {formatEventCopy(eventInfo.content.giftEmptyMessage)}
        </p>
      )}

      <div className="gift-registry">
        {registryUrl ? (
          <a
            href={registryUrl.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            View the gift registry <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span>Gift registry details to be shared soon</span>
        )}
      </div>
      {eventInfo.invitation.sectionVisibility.surprise && <BirthdaySurprise />}
    </section>
  );
}

function CelebrationStream() {
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const [approvedWishes, setApprovedWishes] = useState<WishRecord[]>([]);
  const [wishLoadError, setWishLoadError] = useState("");
  const [chatDraft, setChatDraft] = useState("");
  const [demoMessages, setDemoMessages] = useState<
    Array<{ id: number; message: string; time: string }>
  >([]);
  const [reactionBubbles, setReactionBubbles] = useState<
    Array<{ id: number; emoji: string }>
  >([]);
  const [shareMessage, setShareMessage] = useState("");
  const [mediaError, setMediaError] = useState(false);
  const { streaming, celebration } = eventInfo;
  const safePlatformUrl = getSafeStreamingUrl();
  const safeEmbedUrl = getSafeEmbeddedVideoUrl();
  const safeRecordingUrl = getSafeRecordingUrl();
  const shareUrl = buildWhatsAppShareUrl("stream");
  const scheduledDate = isProvided(streaming.scheduledDateISO)
    ? streaming.scheduledDateISO
    : celebration.dateISO;
  const scheduledTime = isProvided(streaming.scheduledTime24)
    ? streaming.scheduledTime24
    : celebration.startTime24;
  const timeZone = isProvided(streaming.timeZone)
    ? streaming.timeZone.trim()
    : celebration.timeZone.trim();
  const eventTimestamp = getEventTimestamp(scheduledDate, scheduledTime, timeZone);
  const dateLabel = formatConfiguredDate(scheduledDate);
  const timeLabel = formatEventTime(scheduledTime, "");
  const timeZoneLabel = getTimeZoneLabel(timeZone, eventTimestamp ?? Date.now());

  const getDirectVideoUrl = (value: string) => {
    const url = getSafeHttpsUrl(value);
    if (!url || hasPrivateUrlParameters(url)) return null;
    return /\.(?:mp4|webm|ogv|ogg|m3u8)$/i.test(url.pathname) ? url.href : null;
  };
  const directStreamUrl = getDirectVideoUrl(streaming.streamingUrl);
  const directRecordingUrl = getDirectVideoUrl(streaming.recordingUrl);
  const configuredStream = Boolean(safePlatformUrl || safeEmbedUrl || directStreamUrl);
  const status: StreamingStatus =
    streaming.status === "completed"
      ? "completed"
      : streaming.status === "not-configured" || !configuredStream
        ? "not-configured"
        : streaming.status;
  const isUpcoming = status === "upcoming";
  const isLive = status === "live" && configuredStream;
  const youtubeEmbedUrl = useMemo(() => {
    const sourceUrl = status === "completed" ? safeRecordingUrl : safePlatformUrl;
    if (!sourceUrl || streaming.platform !== "YouTube Live") return null;
    try {
      const url = new URL(sourceUrl);
      const videoId =
        url.hostname === "youtu.be"
          ? url.pathname.slice(1).split("/")[0]
          : url.pathname.startsWith("/watch")
            ? url.searchParams.get("v")
            : url.pathname.match(/^\/(?:live|shorts)\/([A-Za-z0-9_-]+)/)?.[1];
      return videoId && /^[A-Za-z0-9_-]+$/.test(videoId)
        ? `https://www.youtube-nocookie.com/embed/${videoId}?controls=1&rel=0`
        : null;
    } catch {
      return null;
    }
  }, [safePlatformUrl, safeRecordingUrl, status, streaming.platform]);
  const embedUrl =
    safeEmbedUrl ?? (isLive || status === "completed" ? youtubeEmbedUrl : null);
  const videoUrl = isLive ? directStreamUrl : status === "completed" ? directRecordingUrl : null;
  const streamUnits = secondsRemaining === null
    ? []
    : [
        { label: "Days", value: Math.floor(secondsRemaining / 86400) },
        { label: "Hours", value: Math.floor((secondsRemaining % 86400) / 3600) },
        { label: "Minutes", value: Math.floor((secondsRemaining % 3600) / 60) },
        { label: "Seconds", value: secondsRemaining % 60 },
      ];

  useEffect(() => {
    if (!isUpcoming || eventTimestamp === null) {
      setSecondsRemaining(null);
      return;
    }
    const updateCountdown = () => setSecondsRemaining(getSecondsUntilBirthday(eventTimestamp));
    updateCountdown();
    if (eventTimestamp <= Date.now()) return;
    const timerId = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timerId);
  }, [eventTimestamp, isUpcoming]);

  useEffect(() => {
    let active = true;
    void localDemoWishService.list()
      .then((records) => {
        if (active) {
          setApprovedWishes(
            records.filter((wish) =>
              wish.status === "approved" && wish.type === "written" && wish.featured !== false,
            ).slice(0, 3),
          );
        }
      })
      .catch((error: unknown) => {
        if (active) {
          setWishLoadError(
            error instanceof Error
              ? `Birthday wishes could not be loaded: ${error.message}`
              : "Birthday wishes could not be loaded from this browser.",
          );
        }
      });
    return () => { active = false; };
  }, []);

  async function handleShareStream() {
    const url = new URL(window.location.href);
    url.hash = "celebrate-online";
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${getBabyName()}'s birthday celebration`,
          text: `Join ${getBabyName()}'s birthday celebration online.`,
          url: url.href,
        });
        setShareMessage("Thanks for sharing the celebration!");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url.href);
        setShareMessage("Celebration link copied.");
      } else {
        setShareMessage("Sharing is unavailable here. Copy the page link from your address bar.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShareMessage(
        error instanceof Error
          ? `Could not share the celebration: ${error.message}`
          : "Could not share the celebration.",
      );
    }
  }

  function addDemoReaction(emoji: string) {
    const id = Date.now() + Math.random();
    setReactionBubbles((current) => [...current.slice(-4), { id, emoji }]);
    window.setTimeout(
      () => setReactionBubbles((current) => current.filter((reaction) => reaction.id !== id)),
      1600,
    );
  }

  const statusLabel = isLive
    ? "LIVE NOW"
    : status === "upcoming"
      ? "COMING UP"
      : status === "completed"
        ? "STREAM ENDED"
        : "STREAM PREPARING";
  const playerMessage = status === "upcoming"
    ? "Our celebration begins soon"
    : status === "completed"
      ? "A lovely day to remember"
      : "A little magic is on its way";
  const playerDescription = status === "upcoming"
    ? dateLabel && timeLabel
      ? `${dateLabel} ? ${timeLabel}${timeZoneLabel ? ` ${timeZoneLabel}` : ""}`
      : "The celebration schedule will be shared soon."
    : status === "completed"
      ? safeRecordingUrl
        ? "The recording is ready to revisit."
        : "Highlights are not available yet."
      : "The organizer has not added a stream link yet.";

  return (
    <section
      className="stream-section stream-redesign"
      id="celebrate-online"
      aria-labelledby="stream-title"
    >
      <div className="stream-redesign-inner">
        <header className="stream-redesign-heading">
          <p className="stream-redesign-kicker"><Leaf size={16} aria-hidden="true" /> A little celebration, wherever you are</p>
          <h2 id="stream-title">{formatEventCopy(eventInfo.content.streamHeading)}</h2>
          <p>{formatEventCopy(eventInfo.content.streamIntroduction)}</p>
        </header>

        <div className="stream-redesign-layout">
          <div className="stream-redesign-main">
            <div className={`stream-live-player${embedUrl || videoUrl ? " has-media" : ""}`}>
              <span className={`stream-live-badge is-${isLive ? "live" : status}`}>
                {isLive && <span aria-hidden="true" />}{statusLabel}
              </span>
              {(isLive || status === "completed") && embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={`${getBabyName()}'s birthday celebration stream`}
                  loading="lazy"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : videoUrl ? (
                <video
                  src={videoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  onError={() => setMediaError(true)}
                  aria-label={`${getBabyName()}'s birthday ${status === "completed" ? "recording" : "live stream"}`}
                />
              ) : (
                <div className={`stream-live-placeholder is-${status}`}>
                  <span className="stream-live-sun" aria-hidden="true" />
                  <span className="stream-live-leaf stream-live-leaf-left" aria-hidden="true" />
                  <span className="stream-live-leaf stream-live-leaf-right" aria-hidden="true" />
                  <span className="stream-live-animal" aria-hidden="true"><SafariCompanion animal="elephant" /></span>
                  <Sparkles className="stream-live-sparkle stream-live-sparkle-one" aria-hidden="true" />
                  <Sparkles className="stream-live-sparkle stream-live-sparkle-two" aria-hidden="true" />
                  <div className="stream-live-placeholder-copy">
                    <strong>{playerMessage}</strong>
                    <span>{playerDescription}</span>
                    {status === "live" && safePlatformUrl && (
                      <a href={safePlatformUrl} target="_blank" rel="noopener noreferrer">
                        Open {streaming.platform} <ExternalLink size={15} />
                      </a>
                    )}
                    {status === "completed" && safeRecordingUrl && (
                      <a href={safeRecordingUrl} target="_blank" rel="noopener noreferrer">
                        Watch celebration recording <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>
              )}
              {mediaError && (
                <p className="stream-live-error" role="alert">
                  This video could not be played here. Open the stream or recording in a new tab.
                </p>
              )}
              {isLive && !embedUrl && !videoUrl && safePlatformUrl && (
                <a className="stream-live-external" href={safePlatformUrl} target="_blank" rel="noopener noreferrer">
                  Open the {streaming.platform} stream <ExternalLink size={16} />
                </a>
              )}
            </div>

            {isUpcoming && (
              <div className="stream-live-upcoming" aria-live="polite">
                <strong>{dateLabel && timeLabel ? `${dateLabel} ? ${timeLabel}${timeZoneLabel ? ` ${timeZoneLabel}` : ""}` : "Celebration schedule to be announced"}</strong>
                {secondsRemaining !== null && secondsRemaining > 0 && (
                  <div className="stream-live-countdown" aria-label="Time until the live celebration">
                    {streamUnits.map((unit) => (
                      <span key={unit.label}><strong>{String(unit.value).padStart(2, "0")}</strong><small>{unit.label}</small></span>
                    ))}
                  </div>
                )}
                {secondsRemaining === 0 && <span>The scheduled start time has arrived. The stream will appear when the organizer starts it.</span>}
              </div>
            )}

            <div className="stream-live-event-details">
              <span><CalendarDays size={18} aria-hidden="true" /><span><small>CELEBRATION DATE</small><strong>{dateLabel || "To be announced"}</strong></span></span>
              <span><Clock3 size={18} aria-hidden="true" /><span><small>START TIME</small><strong>{timeLabel ? `${timeLabel}${timeZoneLabel ? ` ${timeZoneLabel}` : ""}` : "To be announced"}</strong></span></span>
            </div>

            <div className="stream-live-greeting">
              <span className="stream-live-greeting-animal" aria-hidden="true"><SafariCompanion animal="lion" /></span>
              <span><small>A LITTLE BIRTHDAY CHEER</small><strong>Sending {getBabyName()} the biggest birthday wishes!</strong><span>Thanks for being part of this little adventure, wherever you?re watching from.</span></span>
              <Sparkles aria-hidden="true" />
            </div>

            <div className="stream-live-info-cards">
              <article><CalendarDays size={19} aria-hidden="true" /><small>CELEBRATION DETAILS</small><strong>{dateLabel || "Date to be announced"}</strong><span>{timeLabel ? `${timeLabel}${timeZoneLabel ? ` ${timeZoneLabel}` : ""}` : "Time to be announced"}</span></article>
              <article><Heart size={19} aria-hidden="true" /><small>BIRTHDAY WISHES</small><strong>{approvedWishes.length ? `${approvedWishes.length} approved wishes` : "Send a little love"}</strong><span>Approved wishes from this browser?s demo wish wall.</span></article>
              <article className="stream-live-share-card"><Share2 size={19} aria-hidden="true" /><small>SHARE THE CELEBRATION</small><strong>Pass the party along</strong><button type="button" onClick={() => void handleShareStream()}>Share this celebration <Share2 size={15} /></button>{shareUrl && <a href={shareUrl} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Share on WhatsApp</a>}{shareMessage && <span role="status">{shareMessage}</span>}</article>
            </div>
          </div>

          <aside className="stream-live-lounge" aria-label="Birthday celebration interactions">
            <div className="stream-live-lounge-heading"><MessageCircle size={20} aria-hidden="true" /><span><small>GUEST LOUNGE</small><strong>Share the joy</strong></span><span className="stream-live-demo-tag">LOCAL DEMO</span></div>
            <p className="stream-live-demo-notice">Chat and reactions are a local demo only. Messages are not sent to other guests.</p>
            <p className="stream-live-viewers"><UsersRound size={16} aria-hidden="true" /> Viewer count is not provided by the configured stream.</p>

            <section className="stream-live-wishes" aria-labelledby="stream-live-wishes-title">
              <h3 id="stream-live-wishes-title"><Heart size={16} aria-hidden="true" /> Birthday wishes</h3>
              {wishLoadError ? <p role="alert">{wishLoadError}</p> : approvedWishes.length ? (
                <ul>{approvedWishes.map((wish) => <li key={wish.id}><p>{wish.message || wish.caption}</p><span>? {wish.guestName || "A friend"}</span></li>)}</ul>
              ) : <p>No approved wishes have been shared in this browser?s demo wall yet.</p>}
            </section>

            <section className="stream-live-chat" aria-labelledby="stream-live-chat-title">
              <h3 id="stream-live-chat-title"><MessageCircle size={16} aria-hidden="true" /> Celebration chat</h3>
              <div className="stream-live-messages" aria-live="polite">
                {demoMessages.length ? demoMessages.map((message) => (
                  <article key={message.id}><span aria-hidden="true">G</span><div><strong>Guest ? demo</strong><p>{message.message}</p><small>{message.time}</small></div></article>
                )) : <p>Your birthday message will appear here in this demo.</p>}
                {reactionBubbles.length > 0 && <div className="stream-live-reaction-bubbles" aria-label="Recent demo reactions">{reactionBubbles.map((reaction) => <span key={reaction.id}>{reaction.emoji}</span>)}</div>}
              </div>
              <form onSubmit={(event) => {
                event.preventDefault();
                const message = chatDraft.trim();
                if (!message) return;
                setDemoMessages((current) => [...current.slice(-19), {
                  id: Date.now(),
                  message,
                  time: new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date()),
                }]);
                setChatDraft("");
              }}>
                <label className="visually-hidden" htmlFor="stream-live-chat-input">Write a demo birthday message</label>
                <input id="stream-live-chat-input" type="text" maxLength={280} value={chatDraft} onChange={(event) => setChatDraft(event.target.value)} placeholder="Write a little birthday wish?" />
                <button type="submit" disabled={!chatDraft.trim()} aria-label="Add message to local demo chat"><Send size={17} aria-hidden="true" /></button>
              </form>
            </section>

            <div className="stream-live-reactions" aria-label="Local demo reactions">
              <span>Send a little cheer</span>
              {[{ emoji: "??", label: "heart" }, { emoji: "??", label: "party" }, { emoji: "??", label: "lion" }, { emoji: "?", label: "sparkles" }].map(({ emoji, label }) => (
                <button key={emoji} type="button" aria-label={`Send ${label} reaction in local demo`} onClick={() => addDemoReaction(emoji)}>{emoji}</button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

type RsvpAttendance = "accept" | "decline";

type RsvpResponse = {
  guestName: string;
  email: string;
  phone: string;
  guestCount: string;
  attendance: RsvpAttendance | "";
  message: string;
  mealGuests: MealGuest[];
};

type MealPreference =
  | "Vegetarian"
  | "Non-Vegetarian"
  | "Vegan"
  | "Jain"
  | "Other";
type MealGuest = {
  name: string;
  category: "Adult" | "Child";
  preference: MealPreference | "";
  customPreference: string;
  dietaryRestrictions: string;
  allergies: string;
};

function createMealGuest(name = ""): MealGuest {
  return {
    name,
    category: "Adult",
    preference: "",
    customPreference: "",
    dietaryRestrictions: "",
    allergies: "",
  };
}

function resizeMealGuests(
  guests: MealGuest[],
  count: number,
  primaryName = "",
) {
  const resized = guests.slice(0, count);
  while (resized.length < count) {
    resized.push(createMealGuest());
  }
  if (resized.length > 0 && !resized[0].name) {
    resized[0] = { ...resized[0], name: primaryName };
  }
  return resized;
}

type RsvpField = keyof RsvpResponse;
type RsvpErrors = Partial<Record<RsvpField, string>>;
type GuestRecordInput = Omit<
  RsvpResponse,
  "guestCount" | "attendance" | "mealGuests"
> & {
  guestCount: number;
  attendance: RsvpAttendance;
  mealGuests?: MealGuest[];
};
type GuestRecord = GuestRecordInput & {
  id: string;
  submittedAt: string;
};
type GuestRecordService = {
  list: () => Promise<GuestRecord[]>;
  create: (record: GuestRecordInput) => Promise<GuestRecord>;
  update: (id: string, record: GuestRecordInput) => Promise<GuestRecord>;
  remove: (id: string) => Promise<void>;
  clear: () => Promise<void>;
};

const guestRecordsStorageKey = "little-wild-one-demo-guests-v1";

function isMealGuest(value: unknown): value is MealGuest {
  if (!value || typeof value !== "object") {
    return false;
  }
  const guest = value as Record<string, unknown>;
  return (
    typeof guest.name === "string" &&
    (guest.category === "Adult" || guest.category === "Child") &&
    (guest.preference === "" ||
      guest.preference === "Vegetarian" ||
      guest.preference === "Non-Vegetarian" ||
      guest.preference === "Vegan" ||
      guest.preference === "Jain" ||
      guest.preference === "Other") &&
    typeof guest.customPreference === "string" &&
    typeof guest.dietaryRestrictions === "string" &&
    typeof guest.allergies === "string"
  );
}

function isGuestRecord(value: unknown): value is GuestRecord {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;
  return (
    typeof record.id === "string" &&
    typeof record.guestName === "string" &&
    typeof record.email === "string" &&
    typeof record.phone === "string" &&
    typeof record.guestCount === "number" &&
    Number.isSafeInteger(record.guestCount) &&
    record.guestCount >= 1 &&
    (record.attendance === "accept" || record.attendance === "decline") &&
    typeof record.message === "string" &&
    typeof record.submittedAt === "string" &&
    !Number.isNaN(Date.parse(record.submittedAt)) &&
    (record.mealGuests === undefined ||
      (Array.isArray(record.mealGuests) &&
        record.mealGuests.every(isMealGuest)))
  );
}

function readDemoGuestRecords() {
  let serialized: string | null;
  try {
    serialized = window.localStorage.getItem(guestRecordsStorageKey);
  } catch {
    throw new Error(
      "Local demo storage is unavailable in this browser. Guest records could not be loaded.",
    );
  }

  if (!serialized) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(serialized);
    if (!Array.isArray(parsed) || !parsed.every(isGuestRecord)) {
      throw new Error("Stored guest data does not match the expected format.");
    }
    return parsed;
  } catch {
    throw new Error(
      "Saved demo guest data could not be read. It has not been changed or deleted.",
    );
  }
}

function writeDemoGuestRecords(records: GuestRecord[]) {
  try {
    window.localStorage.setItem(guestRecordsStorageKey, JSON.stringify(records));
  } catch {
    throw new Error(
      "Your browser could not save this demo RSVP. Check available local storage and try again.",
    );
  }
}

const localDemoGuestService: GuestRecordService = {
  async list() {
    return readDemoGuestRecords();
  },
  async create(input) {
    const records = readDemoGuestRecords();
    const record: GuestRecord = {
      ...input,
      id:
        typeof window.crypto?.randomUUID === "function"
          ? window.crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      submittedAt: new Date().toISOString(),
    };
    writeDemoGuestRecords([record, ...records]);
    return record;
  },
  async update(id, input) {
    const records = readDemoGuestRecords();
    const index = records.findIndex((record) => record.id === id);
    if (index < 0) {
      throw new Error("That guest response is no longer available.");
    }
    const updated = { ...records[index], ...input };
    records[index] = updated;
    writeDemoGuestRecords(records);
    return updated;
  },
  async remove(id) {
    const records = readDemoGuestRecords();
    if (!records.some((record) => record.id === id)) {
      throw new Error("That guest response is no longer available.");
    }
    writeDemoGuestRecords(records.filter((record) => record.id !== id));
  },
  async clear() {
    try {
      window.localStorage.removeItem(guestRecordsStorageKey);
    } catch {
      throw new Error(
        "Your browser could not clear the local demo guest responses.",
      );
    }
  },
};

function csvCell(value: string) {
  const safeValue = /^[\s]*[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${safeValue.replace(/"/g, '""')}"`;
}

function buildGuestCsv(records: GuestRecord[]) {
  const headers = [
    "Guest name",
    "Email",
    "Phone",
    "Attendance",
    "Guest count",
    "Birthday message",
    "Submission date",
    "Attending guest name",
    "Guest category",
    "Meal preference",
    "Custom meal preference",
    "Dietary restrictions",
    "Allergies",
  ];
  const rows = records.flatMap((record) => {
    const guests =
      record.attendance === "accept" ? record.mealGuests ?? [] : [];
    const attendeeRows = guests.length > 0 ? guests : [null];
    return attendeeRows.map((guest) => [
      record.guestName,
      record.email,
      record.phone,
      record.attendance === "accept" ? "Accepted" : "Declined",
      String(record.guestCount),
      record.message,
      record.submittedAt,
      guest?.name ?? "",
      guest?.category ?? "",
      guest?.preference ?? "",
      guest?.customPreference ?? "",
      guest?.dietaryRestrictions ?? "",
      guest?.allergies ?? "",
    ]);
  });
  return [headers, ...rows]
    .map((row) => row.map(csvCell).join(","))
    .join("\r\n");
}

type WishType = "written" | "voice" | "photo";
type WishStatus = "pending" | "approved" | "rejected";
type WishRecord = {
  id: string;
  guestName: string;
  type: WishType;
  status: WishStatus;
  submittedAt: string;
  message: string;
  caption: string;
  mediaType: string;
  durationSeconds: number;
  featured?: boolean;
};

type DemoWrittenWish = {
  id: string;
  guestName: string;
  message: string;
};

type DemoVoiceWish = {
  id: string;
  guestName: string;
  initials: string;
  message: string;
};

type DemoPhotoWish = {
  id: string;
  guestName: string;
  caption: string;
  alt: string;
  src: string;
  sourceUrl: string;
};

const demoWrittenWishes: DemoWrittenWish[] = [
  {
    id: "demo-written-grandparents",
    guestName: "Grandma & Grandpa",
    message:
      "Wishing our little sunshine a lifetime of happiness, good health and endless adventures. Lots of love!",
  },
  {
    id: "demo-written-rahul",
    guestName: "Uncle Rahul",
    message:
      "Keep smiling, keep exploring and fill every day with beautiful little discoveries. Happy Birthday!",
  },
  {
    id: "demo-written-priya",
    guestName: "Aunt Priya",
    message:
      "May your journey always be filled with laughter, wonderful memories and people who love you.",
  },
  {
    id: "demo-written-family-friends",
    guestName: "Family Friends",
    message:
      "Sending hugs, blessings and lots of birthday wishes to our little explorer!",
  },
  {
    id: "demo-written-cousins",
    guestName: "Cousins",
    message:
      "More adventures, more giggles and more beautiful memories. Have the happiest birthday!",
  },
  {
    id: "demo-written-family",
    guestName: "Family",
    message:
      "You make every moment brighter. Wishing you a wonderful birthday and a beautiful year ahead!",
  },
];

const demoVoiceWishes: DemoVoiceWish[] = [
  {
    id: "demo-voice-grandparents",
    guestName: "Grandma & Grandpa",
    initials: "G&G",
    message:
      "Happy birthday, our little sunshine. We love you more than all the stars in the jungle sky!",
  },
  {
    id: "demo-voice-rahul",
    guestName: "Uncle Rahul",
    initials: "UR",
    message:
      "Have the happiest birthday, little explorer! Keep laughing and finding magic in every little thing.",
  },
  {
    id: "demo-voice-priya",
    guestName: "Aunt Priya",
    initials: "AP",
    message:
      "Sending you a big birthday hug and wishes for a year full of joy, wonder and lovely adventures.",
  },
];

const demoPhotoWishes: DemoPhotoWish[] = [
  {
    id: "demo-photo-explorer",
    guestName: "Cousin Maya",
    caption: "A little explorer in the making",
    alt: "Illustrative Pexels stock photograph of a child in a safari outfit, not the birthday child.",
    src: defaultEventInfo.gallery[0].src,
    sourceUrl: defaultEventInfo.gallery[0].sourceUrl,
  },
  {
    id: "demo-photo-garden",
    guestName: "Family Friends",
    caption: "A birthday beneath the garden trees",
    alt: "Illustrative Pexels stock photograph of a child in a garden celebration, not the birthday child.",
    src: defaultEventInfo.gallery[1].src,
    sourceUrl: defaultEventInfo.gallery[1].sourceUrl,
  },
  {
    id: "demo-photo-family",
    guestName: "Uncle Rahul",
    caption: "A joyful family celebration",
    alt: "Illustrative Pexels stock photograph of a family celebrating, not the birthday child's family.",
    src: defaultEventInfo.gallery[2].src,
    sourceUrl: defaultEventInfo.gallery[2].sourceUrl,
  },
  {
    id: "demo-photo-birthday",
    guestName: "Aunt Priya",
    caption: "A day full of birthday joy",
    alt: "Illustrative Pexels stock photograph of a birthday celebration, not the birthday child.",
    src: defaultEventInfo.gallery[3].src,
    sourceUrl: defaultEventInfo.gallery[3].sourceUrl,
  },
  {
    id: "demo-photo-safari",
    guestName: "Cousins",
    caption: "A safari gathering with family",
    alt: "Illustrative Pexels stock photograph of a family gathering, not the birthday child's family.",
    src: defaultEventInfo.gallery[4].src,
    sourceUrl: defaultEventInfo.gallery[4].sourceUrl,
  },
  {
    id: "demo-photo-smiles",
    guestName: "Grandma & Grandpa",
    caption: "Little smiles, big birthday memories",
    alt: "Illustrative Pexels stock photograph of a child in a safari costume, not the birthday child.",
    src: defaultEventInfo.baby.storyPhotoUrl,
    sourceUrl: defaultEventInfo.baby.storyPhotoSourceUrl,
  },
];

type DemoVoicePlayback = {
  id: string | null;
  status: "stopped" | "playing" | "paused" | "ended";
  currentTime: number;
};

function estimateDemoSpeechDuration(message: string) {
  return Math.max(4, Math.ceil(message.length / 13));
}

function formatPlaybackTime(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  return `${Math.floor(safeSeconds / 60)}:${String(safeSeconds % 60).padStart(2, "0")}`;
}

function DemoVoiceWishCard({
  wish,
  playback,
  onToggle,
  onStop,
  style,
}: {
  wish: DemoVoiceWish;
  playback: DemoVoicePlayback;
  onToggle: (wish: DemoVoiceWish) => void;
  onStop: () => void;
  style?: CSSProperties;
}) {
  const duration = estimateDemoSpeechDuration(wish.message);
  const currentTime = playback.id === wish.id ? playback.currentTime : 0;
  const progress = Math.min(100, (currentTime / duration) * 100);
  const isPlaying = playback.id === wish.id && playback.status === "playing";
  const isPaused = playback.id === wish.id && playback.status === "paused";
  const isEnded = playback.id === wish.id && playback.status === "ended";
  const isSupported =
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    typeof SpeechSynthesisUtterance !== "undefined";

  return (
    <article
      className={`wish-memory-card is-voice is-demo-voice${isPlaying ? " is-playing" : ""}`}
      style={style}
    >
      <div className="wish-memory-topline">
        <span aria-hidden="true">♫</span>
      </div>
      <div className="wish-demo-voice-guest">
        <span className="wish-demo-avatar" aria-hidden="true">{wish.initials}</span>
        <div>
          <strong>{wish.guestName}</strong>
          <small>Browser voice preview</small>
        </div>
      </div>
      <p className="wish-memory-message">{wish.message}</p>
      <div className="wish-demo-audio">
        <div className="wish-demo-audio-controls">
          <button
            type="button"
            className="wish-demo-play"
            onClick={() => onToggle(wish)}
            disabled={!isSupported}
            aria-label={
              isPlaying
                ? `Pause voice wish from ${wish.guestName}`
                : isPaused
                  ? `Resume voice wish from ${wish.guestName}`
                  : `Play voice wish from ${wish.guestName}`
            }
            aria-pressed={isPlaying}
            title={!isSupported ? "Speech synthesis is unavailable in this browser" : undefined}
          >
            {isPlaying ? <Pause size={17} /> : <Play size={17} />}
          </button>
          <div
            className="wish-demo-waveform"
            aria-hidden="true"
            style={{ "--wave-progress": `${progress}%` } as CSSProperties}
          >
            {Array.from({ length: 28 }, (_, index) => (
              <span key={index} style={{ "--wave-index": index } as CSSProperties} />
            ))}
          </div>
          <button
            type="button"
            className="wish-demo-stop"
            onClick={onStop}
            disabled={!isPlaying && !isPaused}
            aria-label={`Stop voice wish from ${wish.guestName}`}
          >
            <span aria-hidden="true">■</span>
          </button>
        </div>
        <div
          className="wish-demo-progress-track"
          role="progressbar"
          aria-label={`Estimated playback progress for ${wish.guestName}'s browser voice preview`}
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={Math.min(duration, Math.floor(currentTime))}
          aria-valuetext={`${formatPlaybackTime(currentTime)} of approximately ${formatPlaybackTime(duration)}`}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="wish-demo-playback-meta">
          <span>{formatPlaybackTime(currentTime)}</span>
          <span>{isEnded ? "Finished" : `Approx. ${formatPlaybackTime(duration)}`}</span>
        </div>
        {!isSupported && (
          <small className="wish-demo-audio-note" role="status">
            Browser speech playback is unavailable here.
          </small>
        )}
      </div>
      <p className="wish-memory-author">With love, <strong>{wish.guestName}</strong></p>
    </article>
  );
}

type WishInput = Omit<
  WishRecord,
  "id" | "status" | "submittedAt" | "mediaType" | "durationSeconds"
> & {
  media?: Blob;
  mediaType?: string;
  durationSeconds?: number;
};
type WishService = {
  list: () => Promise<WishRecord[]>;
  create: (input: WishInput) => Promise<WishRecord>;
  updateStatus: (id: string, status: WishStatus) => Promise<WishRecord>;
  setFeatured: (id: string, featured: boolean) => Promise<WishRecord>;
  remove: (id: string) => Promise<string>;
  clear: () => Promise<void>;
  getMedia: (id: string) => Promise<Blob | null>;
};

const wishesStorageKey = "little-wild-one-demo-wishes-v1";
const wishesDatabaseName = "little-wild-one-wishes-v1";

function isWishRecord(value: unknown): value is WishRecord {
  if (!value || typeof value !== "object") {
    return false;
  }
  const wish = value as Record<string, unknown>;
  return (
    typeof wish.id === "string" &&
    typeof wish.guestName === "string" &&
    (wish.type === "written" || wish.type === "voice" || wish.type === "photo") &&
    (wish.status === "pending" ||
      wish.status === "approved" ||
      wish.status === "rejected") &&
    typeof wish.submittedAt === "string" &&
    !Number.isNaN(Date.parse(wish.submittedAt)) &&
    typeof wish.message === "string" &&
    typeof wish.caption === "string" &&
    typeof wish.mediaType === "string" &&
    typeof wish.durationSeconds === "number" &&
    (wish.featured === undefined || typeof wish.featured === "boolean")
  );
}

function readWishRecords() {
  let serialized: string | null;
  try {
    serialized = window.localStorage.getItem(wishesStorageKey);
  } catch {
    throw new Error("Local demo storage is unavailable. Wishes could not be loaded.");
  }
  if (!serialized) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(serialized);
    if (!Array.isArray(parsed) || !parsed.every(isWishRecord)) {
      throw new Error("Saved wish data does not match the expected format.");
    }
    return parsed as WishRecord[];
  } catch {
    throw new Error("Saved demo wishes could not be read. They have not been changed.");
  }
}

function writeWishRecords(records: WishRecord[]) {
  try {
    window.localStorage.setItem(wishesStorageKey, JSON.stringify(records));
  } catch {
    throw new Error(
      "The browser could not save wish details. Clear local demo data and try again.",
    );
  }
}

function openWishesDatabase(): Promise<IDBDatabase> {
  if (!("indexedDB" in window)) {
    return Promise.reject(
      new Error("This browser does not support local media storage for wishes."),
    );
  }
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(wishesDatabaseName, 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains("media")) {
        database.createObjectStore("media", { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error("Local media storage could not be opened."));
    request.onblocked = () =>
      reject(new Error("Close other invitation tabs to enable local media storage."));
  });
}

async function saveWishMedia(id: string, blob: Blob) {
  const database = await openWishesDatabase();
  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction("media", "readwrite");
    transaction.objectStore("media").put({ id, blob });
    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("Media could not be saved in this browser."));
    transaction.onabort = () =>
      reject(transaction.error ?? new Error("Media storage is full or unavailable."));
  }).finally(() => database.close());
}

async function getWishMedia(id: string): Promise<Blob | null> {
  const database = await openWishesDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction("media", "readonly");
    const request = transaction.objectStore("media").get(id);
    request.onsuccess = () =>
      resolve(
        request.result &&
          request.result.blob instanceof Blob
          ? (request.result.blob as Blob)
          : null,
      );
    request.onerror = () =>
      reject(request.error ?? new Error("Saved media could not be read."));
    transaction.oncomplete = () => database.close();
    transaction.onabort = () => database.close();
  });
}

async function deleteWishMedia(id: string) {
  const database = await openWishesDatabase();
  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction("media", "readwrite");
    transaction.objectStore("media").delete(id);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("Saved media could not be removed."));
    transaction.onabort = () =>
      reject(transaction.error ?? new Error("Saved media could not be removed."));
  }).finally(() => database.close());
}

const localDemoWishService: WishService = {
  async list() {
    return readWishRecords();
  },
  async create(input: WishInput) {
    const records = readWishRecords();
    const id =
      typeof window.crypto?.randomUUID === "function"
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    if (input.media) {
      try {
        await saveWishMedia(id, input.media);
      } catch (error) {
        throw new Error(
          error instanceof DOMException && error.name === "QuotaExceededError"
            ? "This browser is out of local media space. Remove demo recordings or photos and try again."
            : error instanceof Error
              ? error.message
              : "This media could not be saved in local demo storage.",
        );
      }
    }
    const record: WishRecord = {
      id,
      guestName: input.guestName.trim(),
      type: input.type,
      status: "pending",
      submittedAt: new Date().toISOString(),
      message: input.message.trim(),
      caption: input.caption.trim(),
      mediaType: input.mediaType ?? input.media?.type ?? "",
      durationSeconds: input.durationSeconds ?? 0,
      featured: false,
    };
    try {
      writeWishRecords([record, ...records]);
    } catch (error) {
      if (input.media) {
        await deleteWishMedia(id).catch((cleanupError: unknown) => {
          console.warn("An orphaned local wish media item could not be removed.", cleanupError);
        });
      }
      throw error;
    }
    return record;
  },
  async updateStatus(id: string, status: WishStatus) {
    const records = readWishRecords();
    const index = records.findIndex((wish) => wish.id === id);
    if (index < 0) {
      throw new Error("That wish is no longer available.");
    }
    records[index] = { ...records[index], status };
    writeWishRecords(records);
    return records[index];
  },
  async setFeatured(id: string, featured: boolean) {
    const records = readWishRecords();
    const index = records.findIndex((wish) => wish.id === id);
    if (index < 0) {
      throw new Error("That wish is no longer available.");
    }
    if (records[index].status !== "approved" && featured) {
      throw new Error("Approve a wish before featuring it on the invitation.");
    }
    records[index] = { ...records[index], featured };
    writeWishRecords(records);
    return records[index];
  },
  async remove(id: string) {
    const records = readWishRecords();
    const wish = records.find((item) => item.id === id);
    if (!wish) {
      throw new Error("That wish is no longer available.");
    }
    writeWishRecords(records.filter((item) => item.id !== id));
    if (wish.type !== "written") {
      try {
        await deleteWishMedia(id);
      } catch (error) {
        return `The wish was removed from the wall, but its local media could not be cleared: ${
          error instanceof Error ? error.message : "storage is unavailable"
        }`;
      }
    }
    return "";
  },
  async clear() {
    try {
      window.localStorage.removeItem(wishesStorageKey);
      if (!("indexedDB" in window)) {
        return;
      }
      const database = await openWishesDatabase();
      await new Promise<void>((resolve, reject) => {
        const transaction = database.transaction("media", "readwrite");
        transaction.objectStore("media").clear();
        transaction.oncomplete = () => resolve();
        transaction.onerror = () =>
          reject(transaction.error ?? new Error("Local wish media could not be cleared."));
        transaction.onabort = () =>
          reject(transaction.error ?? new Error("Local wish media could not be cleared."));
      }).finally(() => database.close());
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Local demo wishes could not be cleared.",
      );
    }
  },
  getMedia: getWishMedia,
};

function formatGuestSubmittedAt(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Unknown date"
    : new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

type WhatsAppShareKind = "invitation" | "event" | "stream" | "location";

function buildWhatsAppShareUrl(kind: WhatsAppShareKind) {
  const whatsappNumber = getValidWhatsAppNumber(
    eventInfo.sharing.whatsappNumber,
  );
  if (!whatsappNumber) {
    return null;
  }

  const { celebration } = eventInfo;
  const dateParts = getEventDateParts();
  const eventDate = dateParts
    ? ` Save the date: ${getBirthdayDisplayDate()}.`
    : "";
  const startTime = formatEventTime(celebration.startTime24, "");
  const endTime = formatEventTime(celebration.endTime24, "");
  const eventTime =
    startTime && endTime
      ? ` Join us from ${startTime} to ${endTime}${getEventTimeZoneLabel() ? ` ${getEventTimeZoneLabel()}` : ""}.`
      : "";
  const location = [
    celebration.venue,
    celebration.address,
    celebration.cityPostal,
  ]
    .filter(isProvided)
    .join(", ");
  const eventLocation = location ? ` Find us at ${location}.` : "";
  const venueLocation = getVenueLocation();
  const streamingUrl = getSafeStreamingUrl();
  const streamDate = formatConfiguredDate(
    isProvided(eventInfo.streaming.scheduledDateISO)
      ? eventInfo.streaming.scheduledDateISO
      : celebration.dateISO,
  );
  const streamTime = formatEventTime(
    isProvided(eventInfo.streaming.scheduledTime24)
      ? eventInfo.streaming.scheduledTime24
      : celebration.startTime24,
    "",
  );
  const streamTimeZone =
    isProvided(eventInfo.streaming.timeZone)
      ? eventInfo.streaming.timeZone.trim()
      : celebration.timeZone.trim();
  const streamTimestamp = getEventTimestamp(
    isProvided(eventInfo.streaming.scheduledDateISO)
      ? eventInfo.streaming.scheduledDateISO
      : celebration.dateISO,
    isProvided(eventInfo.streaming.scheduledTime24)
      ? eventInfo.streaming.scheduledTime24
      : celebration.startTime24,
    streamTimeZone,
  );
  const streamTimeZoneLabel = getTimeZoneLabel(
    streamTimeZone,
    streamTimestamp ?? Date.now(),
  );
  const eventMapUrl = getVenueLocation()?.directionsUrl;
  const shareUrl = new URL(window.location.href);
  shareUrl.search = "";
  shareUrl.hash = "";
  const invitationUrl = `${shareUrl.origin}${shareUrl.pathname}`;
  const commonDetails = `${eventDate}${eventTime}${eventLocation}`;
  const messages: Record<WhatsAppShareKind, string> = {
    invitation: `You're invited to celebrate ${getBabyName()}'s special day!${commonDetails} See the invitation: ${invitationUrl}`,
    event: `Join us for ${getBabyName()}'s celebration!${commonDetails}${eventMapUrl ? ` Directions: ${eventMapUrl}` : ""} See the invitation: ${invitationUrl}`,
    stream: [
      `Join ${getBabyName()}'s ${getBirthdayAge()} celebration online.`,
      streamDate ? `Date: ${streamDate}.` : "",
      streamTime
        ? `Time: ${streamTime}${streamTimeZoneLabel ? ` ${streamTimeZoneLabel}` : ""}.`
        : "",
      streamingUrl
        ? `Watch here: ${streamingUrl}`
        : "The public streaming link will be shared soon.",
      `Invitation: ${invitationUrl}`,
    ].filter(isProvided).join(" "),
    location: venueLocation
      ? `Join us at ${isProvided(celebration.venue) ? celebration.venue : "our celebration venue"}${location ? `, ${location}` : ""}${venueLocation.mapUrl ? ` Map: ${venueLocation.mapUrl}` : ""} See the invitation: ${invitationUrl}`
      : "",
  };
  const message = messages[kind];
  if (!isProvided(message)) {
    return null;
  }

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 11.6a8.1 8.1 0 0 1-12 7.1L4 20l1.3-3.8A8.1 8.1 0 1 1 20 11.6Z" />
      <path d="M9 8.5c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4 0 .6l-.5.6c-.2.2-.2.4 0 .6.4.7 1 1.2 1.7 1.6.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5 0 .4-.2 1.2-.7 1.6-.5.5-1.1.7-1.8.6-.6 0-1.6-.3-2.8-1-1.4-.8-2.5-2-3.1-3.1-.6-1.1-.7-2-.6-2.5.1-.5.4-.8.6-1.1Z" />
    </svg>
  );
}

function RsvpSection({
  guestRecords,
  setGuestRecords,
  setStorageError,
}: {
  guestRecords: GuestRecord[];
  setGuestRecords: Dispatch<SetStateAction<GuestRecord[]>>;
  setStorageError: Dispatch<SetStateAction<string>>;
}) {
  const whatsappShareUrl = buildWhatsAppShareUrl("invitation");
  const contactEmail = getValidContactEmail(eventInfo.sharing.contactEmail);
  const [response, setResponse] = useState<RsvpResponse>({
    guestName: "",
    email: "",
    phone: "",
    guestCount: "1",
    attendance: "",
    message: "",
    mealGuests: [],
  });
  const [errors, setErrors] = useState<RsvpErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<RsvpAttendance | null>(null);
  const [submissionError, setSubmissionError] = useState("");
  const [submittedGuestName, setSubmittedGuestName] = useState("");
  const submissionLock = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  const updateField = (field: RsvpField, value: string) => {
    setResponse((current) => {
      const next = { ...current, [field]: value };
      if (field === "guestCount" && current.attendance === "accept") {
        const count = Number(value);
        if (Number.isSafeInteger(count) && count >= 1 && count <= 20) {
          next.mealGuests = resizeMealGuests(
            current.mealGuests,
            count,
            current.guestName,
          );
        }
      } else if (field === "attendance") {
        next.mealGuests =
          value === "accept"
            ? resizeMealGuests(
                current.mealGuests,
                Math.min(Math.max(Number(current.guestCount) || 1, 1), 20),
                current.guestName,
              )
            : [];
      } else if (field === "guestName" && current.attendance === "accept") {
        next.mealGuests = current.mealGuests.map((guest, index) =>
          index === 0 &&
          (!guest.name || guest.name.trim() === current.guestName.trim())
            ? { ...guest, name: value }
            : guest,
        );
      }
      return next;
    });
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const updateMealGuest = (index: number, patch: Partial<MealGuest>) => {
    setResponse((current) => ({
      ...current,
      mealGuests: current.mealGuests.map((guest, guestIndex) =>
        guestIndex === index ? { ...guest, ...patch } : guest,
      ),
    }));
    setErrors((current) => {
      if (!current.mealGuests) {
        return current;
      }
      const next = { ...current };
      delete next.mealGuests;
      return next;
    });
  };

  const addMealGuest = () => {
    setResponse((current) => {
      if (current.mealGuests.length >= 20) {
        return current;
      }
      return {
        ...current,
        guestCount: String(current.mealGuests.length + 1),
        mealGuests: [...current.mealGuests, createMealGuest()],
      };
    });
  };

  const removeMealGuest = (index: number) => {
    setResponse((current) => {
      if (current.mealGuests.length <= 1) {
        return current;
      }
      const mealGuests = current.mealGuests.filter(
        (_, guestIndex) => guestIndex !== index,
      );
      return {
        ...current,
        guestCount: String(mealGuests.length),
        mealGuests,
      };
    });
  };

  const validate = () => {
    const nextErrors: RsvpErrors = {};
    const form = formRef.current;
    const emailInput = form?.elements.namedItem("email");
    const guestCount = Number(response.guestCount);
    const hasValidGuestCount =
      response.guestCount.trim().length > 0 &&
      Number.isSafeInteger(guestCount) &&
      guestCount >= 1 &&
      guestCount <= 20;

    if (!response.guestName.trim()) {
      nextErrors.guestName = "Please enter your full name.";
    }

    if (
      response.email.trim() &&
      emailInput instanceof HTMLInputElement &&
      !emailInput.validity.valid
    ) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (
      !response.guestCount.trim() ||
      !Number.isSafeInteger(guestCount) ||
      guestCount < 1 ||
      guestCount > 20
    ) {
      nextErrors.guestCount = "Please enter between 1 and 20 attending guests.";
    }

    if (response.guestName.trim().length > 100) {
      nextErrors.guestName = "Please keep your name under 100 characters.";
    }

    if (response.phone.trim()) {
      const digits = response.phone.replace(/\D/g, "");
      if (digits.length < 7 || response.phone.length > 30) {
        nextErrors.phone = "Please enter a valid phone number.";
      }
    }

    if (response.message.length > 1000) {
      nextErrors.message = "Please keep your message under 1,000 characters.";
    }

    if (!response.attendance) {
      nextErrors.attendance = "Please let us know if you can join us.";
    }

    if (response.attendance === "accept" && hasValidGuestCount) {
      if (response.mealGuests.length !== guestCount) {
        nextErrors.guestCount =
          "Please add meal details for each attending guest.";
      } else if (
        response.mealGuests.some(
          (guest) =>
            !guest.name.trim() ||
            guest.name.length > 100 ||
            !guest.preference ||
            (guest.preference === "Other" && !guest.customPreference.trim()) ||
            guest.customPreference.length > 100 ||
            guest.dietaryRestrictions.length > 300 ||
            guest.allergies.length > 300,
        )
      ) {
        nextErrors.mealGuests =
          "Please add each attendee's name and meal preference, including a custom preference for Other.";
      }
    }

    setErrors(nextErrors);
    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionLock.current) {
      return;
    }

    if (Object.keys(validate()).length > 0) {
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus();
      });
      return;
    }

    const attendance = response.attendance;
    if (attendance !== "accept" && attendance !== "decline") {
      setErrors((current) => ({
        ...current,
        attendance: "Please let us know if you can join us.",
      }));
      return;
    }

    submissionLock.current = true;
    setIsSubmitting(true);
    setSubmissionError("");

    try {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 350);
      });
      const record = await localDemoGuestService.create({
        ...response,
        guestName: response.guestName.trim(),
        email: response.email.trim(),
        phone: response.phone.trim(),
        guestCount: Number(response.guestCount),
        attendance,
        message: response.message.trim(),
        mealGuests:
          attendance === "accept"
            ? response.mealGuests.map((guest) => ({
                ...guest,
                name: guest.name.trim(),
                customPreference: guest.customPreference.trim(),
                dietaryRestrictions: guest.dietaryRestrictions.trim(),
                allergies: guest.allergies.trim(),
              }))
            : [],
      });
      setGuestRecords((records) => [record, ...records]);
      setSubmittedGuestName(record.guestName);
      setConfirmation(record.attendance);
      setStorageError("");
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "We couldn’t save your reply just now. Please try again.",
      );
    } finally {
      submissionLock.current = false;
      setIsSubmitting(false);
    }
  };

  const startAnotherResponse = () => {
    setConfirmation(null);
    setErrors({});
    setSubmissionError("");
    setResponse({
      guestName: "",
      email: "",
      phone: "",
      guestCount: "1",
      attendance: "",
      message: "",
      mealGuests: [],
    });
  };

  const isInvalid = (field: RsvpField) => Boolean(errors[field]);
  return (
    <section
      className="rsvp-section"
      id="rsvp"
      aria-labelledby="rsvp-title"
    >
      <header className="rsvp-heading">
        <p className="rsvp-kicker">
          <span aria-hidden="true" />
          Kindly reply
        </p>
        <h2 id="rsvp-title">
          {formatEventCopy(eventInfo.content.rsvpHeading)}
        </h2>
        <p>{formatEventCopy(eventInfo.content.rsvpIntroduction)}</p>
      </header>

      <div className="rsvp-layout">
        <div className="rsvp-form-column">
          {confirmation ? (
            <div className={`rsvp-confirmation is-${confirmation}`} role="status" aria-live="polite">
              <span className="rsvp-confirmation-mark" aria-hidden="true">
                {confirmation === "accept" ? "✳" : "♡"}
              </span>
              <span className="rsvp-celebration-animal" aria-hidden="true">
                {confirmation === "accept" ? "🐘 ✨ 🦒" : "🌿 🐒"}
              </span>
              <p className="rsvp-confirmation-kicker">
                {confirmation === "accept"
                  ? "Your little adventure awaits"
                  : "A note received with love"}
              </p>
              <p className="rsvp-confirmation-copy">
                {submittedGuestName ? `${submittedGuestName}, ` : ""}
                {confirmation === "accept"
                  ? "Yay! We can't wait to celebrate with you!"
                  : "We'll miss you! Thank you for letting us know."}
              </p>
              <p className="rsvp-demo-notice">
                Saved in this browser's local demo storage only. It is not sent
                to the parents or shared with other devices.
              </p>
              <button
                className="rsvp-another-button"
                type="button"
                onClick={startAnotherResponse}
              >
                Send another RSVP
              </button>
            </div>
          ) : (
            <>
              <form
                className="rsvp-form"
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                aria-describedby={
                  Object.keys(errors).length > 0
                    ? "rsvp-error-summary"
                    : "rsvp-demo-notice"
                }
              >
                {Object.keys(errors).length > 0 && (
                  <p
                    className="rsvp-error-summary"
                    id="rsvp-error-summary"
                    role="alert"
                    tabIndex={-1}
                  >
                    Please check the highlighted fields and try again.
                  </p>
                )}
                {submissionError && (
                  <p className="rsvp-error-summary" role="alert">
                    {submissionError}
                  </p>
                )}
                <div className="rsvp-fields">
                  <div className={`rsvp-field${isInvalid("guestName") ? " has-error" : ""}`}>
                    <label htmlFor="rsvp-guest-name">
                      Your full name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="rsvp-guest-name"
                      name="guestName"
                      type="text"
                      autoComplete="name"
                      maxLength={100}
                      placeholder="How should we address you?"
                      value={response.guestName}
                      onChange={(event) => updateField("guestName", event.target.value)}
                      aria-invalid={isInvalid("guestName")}
                      aria-describedby={errors.guestName ? "rsvp-name-error" : undefined}
                      required
                    />
                    {errors.guestName && (
                      <span className="rsvp-field-error" id="rsvp-name-error">
                        {errors.guestName}
                      </span>
                    )}
                  </div>

                  <div className={`rsvp-field${isInvalid("email") ? " has-error" : ""}`}>
                    <label htmlFor="rsvp-email">Email address <span>Optional</span></label>
                    <input
                      id="rsvp-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="name@example.com"
                      value={response.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      aria-invalid={isInvalid("email")}
                      aria-describedby={errors.email ? "rsvp-email-error" : undefined}
                    />
                    {errors.email && (
                      <span className="rsvp-field-error" id="rsvp-email-error">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className={`rsvp-field${isInvalid("phone") ? " has-error" : ""}`}>
                    <label htmlFor="rsvp-phone">Phone number <span>Optional</span></label>
                    <input
                      id="rsvp-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="Your preferred number"
                      value={response.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      aria-invalid={isInvalid("phone")}
                      aria-describedby={errors.phone ? "rsvp-phone-error" : undefined}
                    />
                    {errors.phone && (
                      <span className="rsvp-field-error" id="rsvp-phone-error">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div className={`rsvp-field${isInvalid("guestCount") ? " has-error" : ""}`}>
                    <label htmlFor="rsvp-guest-count">
                      Number of attending guests <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="rsvp-guest-count"
                      name="guestCount"
                      type="number"
                      inputMode="numeric"
                      min="1"
                      max="20"
                      step="1"
                      placeholder="1"
                      value={response.guestCount}
                      onChange={(event) => updateField("guestCount", event.target.value)}
                      aria-invalid={isInvalid("guestCount")}
                      aria-describedby={errors.guestCount ? "rsvp-count-error" : undefined}
                      required
                    />
                    {errors.guestCount && (
                      <span className="rsvp-field-error" id="rsvp-count-error">
                        {errors.guestCount}
                      </span>
                    )}
                  </div>

                  <fieldset
                    className={`rsvp-attendance${isInvalid("attendance") ? " has-error" : ""}`}
                    aria-describedby={errors.attendance ? "rsvp-attendance-error" : undefined}
                  >
                    <legend>
                      Will you be joining us? <span aria-hidden="true">*</span>
                    </legend>
                    <div className="rsvp-choice-list">
                      <label className={`rsvp-choice rsvp-choice-accept${response.attendance === "accept" ? " is-selected" : ""}`}>
                        <input
                          type="radio"
                          name="attendance"
                          value="accept"
                          checked={response.attendance === "accept"}
                          onChange={() => updateField("attendance", "accept")}
                          aria-invalid={isInvalid("attendance")}
                          required
                        />
                        <span className="rsvp-choice-mark rsvp-choice-accept-mark" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path d="M12 3.5v3m0 11v3m8.5-8.5h-3m-11 0h-3m14.01-6.01-2.12 2.12m-7.78 7.78-2.12 2.12m12.02 0-2.12-2.12m-7.78-7.78L6.49 6.49" />
                            <circle cx="12" cy="12" r="3.5" />
                          </svg>
                        </span>
                        <span>Joyfully Accept</span>
                      </label>
                      <label className={`rsvp-choice rsvp-choice-decline${response.attendance === "decline" ? " is-selected" : ""}`}>
                        <input
                          type="radio"
                          name="attendance"
                          value="decline"
                          checked={response.attendance === "decline"}
                          onChange={() => updateField("attendance", "decline")}
                          aria-invalid={isInvalid("attendance")}
                          required
                        />
                        <span className="rsvp-choice-mark rsvp-choice-decline-mark" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path d="M19.5 5.5c-7.6.1-12.4 3.5-13 9.1-.3 2.8 1.4 4.8 4 4.8 5.5 0 8.6-6.4 9-13.9Z" />
                            <path d="M5 21c2-5.3 5.4-8.9 10.5-11.5" />
                          </svg>
                        </span>
                        <span>Regretfully Decline</span>
                      </label>
                    </div>
                    {errors.attendance && (
                      <span className="rsvp-field-error" id="rsvp-attendance-error">
                        {errors.attendance}
                      </span>
                    )}
                  </fieldset>

                  {response.attendance === "accept" && (
                    <fieldset
                      className="rsvp-meal-preferences"
                      aria-describedby={
                        errors.mealGuests ? "rsvp-meal-error" : undefined
                      }
                    >
                      <legend>Meal preferences · one entry per attendee</legend>
                      <p className="rsvp-meal-introduction">
                        Help us prepare a thoughtful meal for everyone joining.
                      </p>
                      {errors.mealGuests && (
                        <p className="rsvp-meal-error" id="rsvp-meal-error" role="alert">
                          {errors.mealGuests}
                        </p>
                      )}
                      <div className="rsvp-meal-guest-list">
                        {response.mealGuests.map((guest, index) => (
                          <article className="rsvp-meal-guest" key={index}>
                            <div className="rsvp-meal-guest-heading">
                              <h3>Attendee {index + 1}</h3>
                              {response.mealGuests.length > 1 && (
                                <button
                                  type="button"
                                  className="rsvp-meal-remove"
                                  onClick={() => removeMealGuest(index)}
                                  aria-label={`Remove attendee ${index + 1}`}
                                >
                                  <X size={15} /> Remove
                                </button>
                              )}
                            </div>
                            <div className="rsvp-meal-fields">
                              <label className="rsvp-meal-field">
                                Guest name
                                <input
                                  type="text"
                                  maxLength={100}
                                  required
                                  value={guest.name}
                                  aria-invalid={
                                    Boolean(errors.mealGuests) && !guest.name.trim()
                                  }
                                  onChange={(event) =>
                                    updateMealGuest(index, { name: event.target.value })
                                  }
                                />
                              </label>
                              <label className="rsvp-meal-field">
                                Category
                                <select
                                  value={guest.category}
                                  onChange={(event) =>
                                    updateMealGuest(index, {
                                      category: event.target.value as MealGuest["category"],
                                    })
                                  }
                                >
                                  <option value="Adult">Adult</option>
                                  <option value="Child">Child</option>
                                </select>
                              </label>
                              <label className="rsvp-meal-field">
                                Meal preference
                                <select
                                  value={guest.preference}
                                  required
                                  aria-invalid={
                                    Boolean(errors.mealGuests) && !guest.preference
                                  }
                                  onChange={(event) =>
                                    updateMealGuest(index, {
                                      preference: event.target.value as MealPreference | "",
                                      customPreference:
                                        event.target.value === "Other"
                                          ? guest.customPreference
                                          : "",
                                    })
                                  }
                                >
                                  <option value="">Choose a meal</option>
                                  <option value="Vegetarian">Vegetarian</option>
                                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                                  <option value="Vegan">Vegan</option>
                                  <option value="Jain">Jain</option>
                                  <option value="Other">
                                    Other / Special Dietary Requirements
                                  </option>
                                </select>
                              </label>
                              {guest.preference === "Other" && (
                                <label className="rsvp-meal-field">
                                  Please specify
                                  <input
                                    type="text"
                                    maxLength={100}
                                    required
                                    value={guest.customPreference}
                                    aria-invalid={
                                      Boolean(errors.mealGuests) &&
                                      !guest.customPreference.trim()
                                    }
                                    onChange={(event) =>
                                      updateMealGuest(index, {
                                        customPreference: event.target.value,
                                      })
                                    }
                                  />
                                </label>
                              )}
                              <label className="rsvp-meal-field">
                                Dietary restrictions <span>Optional</span>
                                <input
                                  type="text"
                                  maxLength={300}
                                  value={guest.dietaryRestrictions}
                                  onChange={(event) =>
                                    updateMealGuest(index, {
                                      dietaryRestrictions: event.target.value,
                                    })
                                  }
                                />
                              </label>
                              <label className="rsvp-meal-field">
                                Allergies <span>Optional</span>
                                <input
                                  type="text"
                                  maxLength={300}
                                  value={guest.allergies}
                                  onChange={(event) =>
                                    updateMealGuest(index, { allergies: event.target.value })
                                  }
                                />
                              </label>
                            </div>
                          </article>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="rsvp-meal-add"
                        onClick={addMealGuest}
                        disabled={response.mealGuests.length >= 20}
                      >
                        <Plus size={16} /> Add another attendee
                      </button>
                    </fieldset>
                  )}

                  <div className={`rsvp-field rsvp-message-field${isInvalid("message") ? " has-error" : ""}`}>
                    <label htmlFor="rsvp-message">
                      A little birthday message <span>Optional</span>
                    </label>
                    <textarea
                      id="rsvp-message"
                      name="message"
                      rows={3}
                      maxLength={1000}
                      placeholder="A wish, a note, or a little hello…"
                      value={response.message}
                      onChange={(event) => updateField("message", event.target.value)}
                      aria-invalid={isInvalid("message")}
                      aria-describedby={errors.message ? "rsvp-message-error" : undefined}
                    />
                    {errors.message && (
                      <span className="rsvp-field-error" id="rsvp-message-error">
                        {errors.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="rsvp-form-footer">
                  <p className="rsvp-required-note">
                    <span aria-hidden="true">*</span> Required fields
                  </p>
                  <button
                    className="rsvp-submit-button"
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? "Saving your RSVP…" : "Send Your RSVP"}
                    {isSubmitting ? (
                      <span className="rsvp-submit-spinner" aria-hidden="true" />
                    ) : (
                      <span aria-hidden="true">
                        <ArrowIcon />
                      </span>
                    )}
                  </button>
                </div>
              </form>
              <p className="rsvp-demo-notice rsvp-form-notice" id="rsvp-demo-notice">
                Demo mode — this response is saved only in this browser. It
                will not reach the parents until a private backend is connected.
              </p>
            </>
          )}
        </div>

        <aside className="rsvp-note">
          <div className="rsvp-note-art" aria-hidden="true">
            <span className="rsvp-note-circle" />
            <span className="rsvp-note-leaf rsvp-note-leaf-one" />
            <span className="rsvp-note-leaf rsvp-note-leaf-two" />
            <SafariCompanion animal="elephant" />
          </div>
          <p className="rsvp-note-kicker">
            {formatEventCopy(eventInfo.content.rsvpAsideHeading)}
          </p>
          <h3>{getBabyName()}'s little adventure</h3>
          <p className="rsvp-note-copy">
            {formatEventCopy(eventInfo.content.rsvpAsideIntroduction)}
          </p>
          <span className="rsvp-note-rule" aria-hidden="true" />
          {whatsappShareUrl ? (
            <a
              className="rsvp-share-button"
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share this invitation on WhatsApp"
            >
              <WhatsAppIcon />
              Share on WhatsApp
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="rsvp-share-button is-disabled" aria-disabled="true">
              <WhatsAppIcon />
              WhatsApp sharing unavailable
            </span>
          )}
          <p className="rsvp-share-caption">
            {whatsappShareUrl
              ? "Send a little invitation to someone special."
              : "Add a real international WhatsApp number in the event configuration to enable sharing."}
          </p>
          {contactEmail && (
            <a
              className="rsvp-contact-email"
              href={`mailto:${contactEmail}`}
            >
              Contact the parents
            </a>
          )}
        </aside>
      </div>

    </section>
  );
}

function GuestManagerEntry({
  guestRecords,
  setGuestRecords,
  storageError,
}: {
  guestRecords: GuestRecord[];
  setGuestRecords: Dispatch<SetStateAction<GuestRecord[]>>;
  storageError: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="guest-manager-entry invitation-guest-manager-entry">
      <button
        className="guest-manager-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="guest-manager"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "Close local guest manager" : "Open local guest manager"}
        <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
      </button>
      <p>
        Local demo organizer view. Data stays in this browser only; this is
        not a private or authenticated production guest list.
      </p>
      {isOpen && (
        <GuestManagementPanel
          records={guestRecords}
          onRecordsChange={(records) => setGuestRecords(records)}
          loadError={storageError}
        />
      )}
    </div>
  );
}

function WishesWall() {
  const [records, setRecords] = useState<WishRecord[]>([]);
  const [mediaUrls, setMediaUrls] = useState<Record<string, string>>({});
  const [activeFilter, setActiveFilter] = useState<"all" | WishType>("all");
  const [cardsPerPage, setCardsPerPage] = useState(
    () => (typeof window !== "undefined" && window.innerWidth <= 700 ? 1 : 2),
  );
  const [currentWishPage, setCurrentWishPage] = useState(0);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const [demoVoicePlayback, setDemoVoicePlayback] = useState<DemoVoicePlayback>({
    id: null,
    status: "stopped",
    currentTime: 0,
  });
  const [demoVoiceError, setDemoVoiceError] = useState("");
  const [activeMethod, setActiveMethod] = useState<WishType>("written");
  const [guestName, setGuestName] = useState("");
  const [writtenMessage, setWrittenMessage] = useState("");
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null);
  const [voiceDuration, setVoiceDuration] = useState(0);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoCaption, setPhotoCaption] = useState("");
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [recordingError, setRecordingError] = useState("");
  const [loadingError, setLoadingError] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isRequestingMicrophone, setIsRequestingMicrophone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recordingStartedAtRef = useRef(0);
  const recordingTimerRef = useRef<number | null>(null);
  const audioPreviewUrlRef = useRef<string | null>(null);
  const demoSpeechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const demoSpeechTimerRef = useRef<number | null>(null);
  const demoSpeechStartedAtRef = useRef(0);
  const demoSpeechBaseTimeRef = useRef(0);
  const photoViewerCloseRef = useRef<HTMLButtonElement>(null);
  const photoViewerTriggerRef = useRef<HTMLButtonElement>(null);
  const photoViewerRef = useRef<HTMLDivElement>(null);
  const carouselTouchStartRef = useRef<number | null>(null);

  useEffect(() => {
    const updateCardsPerPage = () => {
      setCardsPerPage(window.innerWidth <= 700 ? 1 : 2);
    };
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const loadRecords = async () => {
    try {
      const wishes = await localDemoWishService.list();
      setRecords(wishes);
      setLoadingError("");
    } catch (error) {
      setLoadingError(
        error instanceof Error ? error.message : "Local wishes could not be loaded.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadRecords();
    const handleStorage = (event: StorageEvent) => {
      if (event.key === wishesStorageKey) {
        void loadRecords();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      if (recordingTimerRef.current !== null) {
        window.clearTimeout(recordingTimerRef.current);
      }
      recorderRef.current?.stream.getTracks().forEach((track) => track.stop());
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (audioPreviewUrlRef.current) {
        URL.revokeObjectURL(audioPreviewUrlRef.current);
      }
      if (demoSpeechTimerRef.current !== null) {
        window.clearInterval(demoSpeechTimerRef.current);
      }
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    let active = true;
    const urls: string[] = [];
    void (async () => {
      const entries: [string, string][] = [];
      try {
        for (const wish of records) {
          if (wish.status !== "approved" || wish.type === "written") {
            continue;
          }
          const blob = await localDemoWishService.getMedia(wish.id);
          if (blob) {
            const url = URL.createObjectURL(blob);
            urls.push(url);
            entries.push([wish.id, url]);
          }
        }
        if (active) {
          setMediaUrls(Object.fromEntries(entries));
        }
      } catch (error) {
        if (active) {
          setLoadingError(
            error instanceof Error
              ? error.message
              : "A saved voice or photo wish could not be opened.",
          );
        }
      }
    })();
    return () => {
      active = false;
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [records]);

  useEffect(() => {
    if (!photoFile) {
      setPhotoPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(photoFile);
    setPhotoPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [photoFile]);

  const clearDemoSpeechTimer = () => {
    if (demoSpeechTimerRef.current !== null) {
      window.clearInterval(demoSpeechTimerRef.current);
      demoSpeechTimerRef.current = null;
    }
  };

  const stopDemoVoice = () => {
    clearDemoSpeechTimer();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    demoSpeechRef.current = null;
    demoSpeechBaseTimeRef.current = 0;
    setDemoVoicePlayback({ id: null, status: "stopped", currentTime: 0 });
  };

  const startDemoSpeechTimer = (
    wish: DemoVoiceWish,
    baseTime: number,
  ) => {
    clearDemoSpeechTimer();
    demoSpeechStartedAtRef.current = Date.now();
    demoSpeechBaseTimeRef.current = baseTime;
    demoSpeechTimerRef.current = window.setInterval(() => {
      if (demoSpeechRef.current?.text !== wish.message) {
        clearDemoSpeechTimer();
        return;
      }
      const duration = estimateDemoSpeechDuration(wish.message);
      const elapsed = Math.min(
        duration,
        baseTime + (Date.now() - demoSpeechStartedAtRef.current) / 1000,
      );
      setDemoVoicePlayback({ id: wish.id, status: "playing", currentTime: elapsed });
    }, 120);
  };

  const toggleDemoVoice = (wish: DemoVoiceWish) => {
    if (
      !("speechSynthesis" in window) ||
      typeof SpeechSynthesisUtterance === "undefined"
    ) {
      setDemoVoiceError(
        "Synthetic sample playback is not supported in this browser. Recorded guest wishes still use their audio player.",
      );
      return;
    }
    setDemoVoiceError("");

    if (demoVoicePlayback.id === wish.id && demoVoicePlayback.status === "playing") {
      window.speechSynthesis.pause();
      clearDemoSpeechTimer();
      setDemoVoicePlayback((current) => ({ ...current, status: "paused" }));
      return;
    }
    if (demoVoicePlayback.id === wish.id && demoVoicePlayback.status === "paused") {
      window.speechSynthesis.resume();
      setDemoVoicePlayback((current) => ({ ...current, status: "playing" }));
      startDemoSpeechTimer(wish, demoVoicePlayback.currentTime);
      return;
    }

    clearDemoSpeechTimer();
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(wish.message);
    utterance.lang = "en-US";
    utterance.rate = 0.92;
    utterance.pitch = 1.05;
    const duration = estimateDemoSpeechDuration(wish.message);
    utterance.onboundary = (event) => {
      if (
        demoSpeechRef.current === utterance &&
        Number.isFinite(event.charIndex) &&
        wish.message.length > 0
      ) {
        const progress = Math.min(1, event.charIndex / wish.message.length);
        setDemoVoicePlayback({
          id: wish.id,
          status: "playing",
          currentTime: Math.min(duration, progress * duration),
        });
      }
    };
    utterance.onend = () => {
      if (demoSpeechRef.current !== utterance) {
        return;
      }
      clearDemoSpeechTimer();
      demoSpeechRef.current = null;
      setDemoVoicePlayback({
        id: wish.id,
        status: "ended",
        currentTime: duration,
      });
    };
    utterance.onerror = (event) => {
      if (demoSpeechRef.current !== utterance || event.error === "canceled") {
        return;
      }
      clearDemoSpeechTimer();
      demoSpeechRef.current = null;
      setDemoVoicePlayback({ id: wish.id, status: "stopped", currentTime: 0 });
      setDemoVoiceError("The browser could not play this synthetic sample. Try again.");
    };
    demoSpeechRef.current = utterance;
    setDemoVoicePlayback({ id: wish.id, status: "playing", currentTime: 0 });
    startDemoSpeechTimer(wish, 0);
    window.speechSynthesis.speak(utterance);
  };

  const clearRecording = () => {
    setVoiceBlob(null);
    setVoiceDuration(0);
    setRecordingError("");
    if (audioPreviewUrlRef.current) {
      URL.revokeObjectURL(audioPreviewUrlRef.current);
      audioPreviewUrlRef.current = null;
    }
  };

  const startRecording = async () => {
    setRecordingError("");
    if (
      !navigator.mediaDevices?.getUserMedia ||
      typeof MediaRecorder === "undefined"
    ) {
      setRecordingError("Voice recording is not supported in this browser.");
      return;
    }
    setIsRequestingMicrophone(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/mp4",
        "audio/ogg;codecs=opus",
      ].find((candidate) => MediaRecorder.isTypeSupported(candidate));
      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined,
      );
      chunksRef.current = [];
      recordingStartedAtRef.current = Date.now();
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      recorder.onerror = () => {
        setRecordingError("The recording stopped unexpectedly. Please try again.");
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        const duration = Math.min(
          60,
          Math.max(0, Math.round((Date.now() - recordingStartedAtRef.current) / 1000)),
        );
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });
        if (!blob.size) {
          setRecordingError("No audio was captured. Please record your wish again.");
        } else if (blob.size > 5 * 1024 * 1024) {
          setRecordingError("This voice wish is over 5 MB. Please record a shorter message.");
        } else {
          if (audioPreviewUrlRef.current) {
            URL.revokeObjectURL(audioPreviewUrlRef.current);
          }
          audioPreviewUrlRef.current = URL.createObjectURL(blob);
          setVoiceBlob(blob);
          setVoiceDuration(duration);
          setRecordingError("");
        }
        setIsRecording(false);
      };
      recorder.start();
      setIsRecording(true);
      setVoiceBlob(null);
      if (recordingTimerRef.current !== null) {
        window.clearTimeout(recordingTimerRef.current);
      }
      recordingTimerRef.current = window.setTimeout(() => {
        if (recorder.state === "recording") {
          recorder.stop();
          setRecordingError("Recording stopped at the 60-second limit.");
        }
      }, 60_000);
    } catch (error) {
      setRecordingError(
        error instanceof DOMException && error.name === "NotAllowedError"
          ? "Microphone access was denied. Allow microphone access in your browser and try again."
          : error instanceof Error
            ? error.message
            : "The microphone could not be started.",
      );
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    } finally {
      setIsRequestingMicrophone(false);
    }
  };

  const stopRecording = () => {
    if (recordingTimerRef.current !== null) {
      window.clearTimeout(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
    }
  };

  const submitWish = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionError("");
    setSuccessMessage("");
    const name = guestName.trim();
    if (!name || name.length > 100) {
      setSubmissionError("Please enter your name (up to 100 characters).");
      return;
    }

    let input: WishInput;
    if (activeMethod === "written") {
      const message = writtenMessage.trim();
      if (!message || message.length > 600) {
        setSubmissionError("Write a birthday wish of 1–600 characters.");
        return;
      }
      input = {
        guestName: name,
        type: "written",
        message,
        caption: "",
      };
    } else if (activeMethod === "voice") {
      if (!voiceBlob?.size) {
        setSubmissionError("Please record a voice wish before submitting.");
        return;
      }
      if (voiceDuration > 60 || voiceBlob.size > 5 * 1024 * 1024) {
        setSubmissionError("Keep the recording under 60 seconds and 5 MB.");
        return;
      }
      input = {
        guestName: name,
        type: "voice",
        message: "",
        caption: "",
        media: voiceBlob,
        mediaType: voiceBlob.type,
        durationSeconds: voiceDuration,
      };
    } else {
      if (!photoFile) {
        setSubmissionError("Choose a JPG, PNG or WebP photograph.");
        return;
      }
      if (photoFile.size > 8 * 1024 * 1024) {
        setSubmissionError("Choose a photograph smaller than 8 MB.");
        return;
      }
      try {
        const compressedImage = await createLocalImageDataUrl(photoFile);
        const media = await fetch(compressedImage).then((response) => response.blob());
        input = {
          guestName: name,
          type: "photo",
          message: "",
          caption: photoCaption.trim(),
          media,
          mediaType: media.type || "image/webp",
        };
      } catch (error) {
        setPhotoError(
          error instanceof Error ? error.message : "This photograph could not be prepared.",
        );
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const record = await localDemoWishService.create(input);
      setRecords((current) => [record, ...current]);
      setSuccessMessage(
        "Thank you! Your wish is saved in this browser and will appear after parent approval.",
      );
      if (activeMethod === "written") {
        setWrittenMessage("");
      } else if (activeMethod === "voice") {
        clearRecording();
      } else {
        setPhotoFile(null);
        setPhotoCaption("");
        setPhotoError("");
      }
    } catch (error) {
      setSubmissionError(
        error instanceof Error ? error.message : "Your wish could not be saved.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const approvedRecords = useMemo(
    () => records.filter((wish) => wish.status === "approved" && wish.featured !== false),
    [records],
  );
  const visibleRecords = useMemo(
    () =>
      approvedRecords.filter(
        (wish) => activeFilter === "all" || wish.type === activeFilter,
      ),
    [activeFilter, approvedRecords],
  );
  const photoMemories = useMemo(
    () => [
      ...demoPhotoWishes.map((photo) => ({ ...photo, isDemo: true })),
      ...approvedRecords
        .filter((wish) => wish.type === "photo" && mediaUrls[wish.id])
        .map((wish) => ({
          id: wish.id,
          guestName: wish.guestName,
          caption: wish.caption || "A birthday memory shared with love",
          alt: wish.caption
            ? `Picture memory shared by ${wish.guestName}: ${wish.caption}`
            : `Picture memory shared by ${wish.guestName}`,
          src: mediaUrls[wish.id],
          sourceUrl: "",
          isDemo: false,
        })),
    ],
    [approvedRecords, mediaUrls],
  );
  const selectedPhotoIndex = photoMemories.findIndex(
    (photo) => photo.id === selectedPhotoId,
  );
  const selectedPhoto =
    selectedPhotoIndex < 0 ? null : photoMemories[selectedPhotoIndex];
  const isPhotoViewerOpen = selectedPhoto !== null;
  const demoWrittenToShow =
    activeFilter === "all" || activeFilter === "written" ? demoWrittenWishes : [];
  const demoVoicesToShow =
    activeFilter === "all" || activeFilter === "voice" ? demoVoiceWishes : [];
  const demoPhotosToShow =
    activeFilter === "all" || activeFilter === "photo" ? demoPhotoWishes : [];
  const wishCardCount =
    demoWrittenToShow.length +
    demoVoicesToShow.length +
    demoPhotosToShow.length +
    visibleRecords.length;
  const wishPageCount = Math.ceil(wishCardCount / cardsPerPage);
  const wishMethods: { id: WishType; label: string }[] = [
    { id: "written", label: "Written Wish" },
    { id: "voice", label: "Voice Wish" },
    { id: "photo", label: "Picture Memory" },
  ];

  useEffect(() => {
    setCurrentWishPage((page) => Math.min(page, Math.max(wishPageCount - 1, 0)));
  }, [wishPageCount]);

  const showPreviousWishPage = () => {
    setCurrentWishPage((page) => Math.max(page - 1, 0));
  };

  const showNextWishPage = () => {
    setCurrentWishPage((page) => Math.min(page + 1, wishPageCount - 1));
  };

  const handleWishCarouselKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPreviousWishPage();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNextWishPage();
    }
  };

  const handleWishCarouselTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("button, audio, a")) {
      carouselTouchStartRef.current = null;
      return;
    }
    carouselTouchStartRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleWishCarouselTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startX = carouselTouchStartRef.current;
    carouselTouchStartRef.current = null;
    const endX = event.changedTouches[0]?.clientX;
    if (startX === null || endX === undefined || Math.abs(endX - startX) < 48) {
      return;
    }
    if (endX < startX) {
      showNextWishPage();
    } else {
      showPreviousWishPage();
    }
  };

  useEffect(() => {
    if (!isPhotoViewerOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    photoViewerCloseRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      photoViewerTriggerRef.current?.focus();
    };
  }, [isPhotoViewerOpen]);

  useEffect(() => {
    if (!selectedPhoto) {
      return;
    }

    const handleViewerKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPhotoId(null);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        const nextIndex = (selectedPhotoIndex + 1) % photoMemories.length;
        setSelectedPhotoId(photoMemories[nextIndex]?.id ?? null);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        const previousIndex =
          (selectedPhotoIndex - 1 + photoMemories.length) % photoMemories.length;
        setSelectedPhotoId(photoMemories[previousIndex]?.id ?? null);
      } else if (event.key === "Tab") {
        const focusable =
          photoViewerRef.current?.querySelectorAll<HTMLElement>(
            "button:not([disabled]), a[href]",
          );
        const first = focusable?.[0];
        const last = focusable?.[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleViewerKeyDown);
    return () => document.removeEventListener("keydown", handleViewerKeyDown);
  }, [photoMemories, selectedPhoto, selectedPhotoIndex]);

  const showPreviousWishPhoto = () => {
    if (selectedPhotoIndex < 0 || !photoMemories.length) {
      return;
    }
    setSelectedPhotoId(
      photoMemories[
        (selectedPhotoIndex - 1 + photoMemories.length) % photoMemories.length
      ]?.id ?? null,
    );
  };

  const showNextWishPhoto = () => {
    if (selectedPhotoIndex < 0 || !photoMemories.length) {
      return;
    }
    setSelectedPhotoId(
      photoMemories[(selectedPhotoIndex + 1) % photoMemories.length]?.id ?? null,
    );
  };

  return (
    <section className="wishes-wall-section" id="little-wishes" aria-labelledby="wishes-wall-title">
      <header className="wishes-wall-heading">
        <p className="wishes-wall-kicker"><span aria-hidden="true" />A GARDEN OF BIRTHDAY MEMORIES</p>
        <h2 id="wishes-wall-title">Little Wishes, Big Love</h2>
        <p>
          Beautiful messages, familiar voices and precious memories shared with our little explorer.
        </p>
      </header>

      <div className="wishes-wall-layout">
        <div className="wishes-submit-panel">
          <div className="wishes-submit-heading">
            <span aria-hidden="true">🐘</span>
            <div>
              <p className="wishes-eyebrow">SEND A LITTLE LOVE</p>
              <h3>Share Your Birthday Wish</h3>
            </div>
          </div>
          <p className="wishes-submit-description">
            Leave a heartfelt message, record your voice or share a happy photograph.
            Every little gesture makes this celebration more special.
          </p>
          <p className="wishes-demo-note">
            Demo mode: submissions stay in this browser and are not shared across devices.
            Parents review every wish before it appears on the wall.
          </p>
          <div className="wishes-method-tabs" role="group" aria-label="Choose a wish type">
            {wishMethods.map(({ id, label }) => (
              <button
                type="button"
                id={`wish-method-${id}`}
                aria-pressed={activeMethod === id}
                className={activeMethod === id ? "is-active" : ""}
                onClick={() => {
                  setActiveMethod(id);
                  setSubmissionError("");
                  setSuccessMessage("");
                }}
                key={id}
              >
                {id === "written" ? <MessageCircle size={16} /> : id === "voice" ? <Mic size={16} /> : <ImagePlus size={16} />}
                {label}
              </button>
            ))}
          </div>
          <form
            className="wishes-submission-form"
            id="wish-submission-form"
            aria-label={`${wishMethods.find((method) => method.id === activeMethod)?.label ?? "Wish"} submission`}
            onSubmit={submitWish}
          >
            <label className="wishes-form-field">
              Guest Name
              <input
                type="text"
                autoComplete="name"
                maxLength={100}
                required
                value={guestName}
                onChange={(event) => setGuestName(event.target.value)}
                placeholder="How should we remember you?"
              />
            </label>

            {activeMethod === "written" && (
              <label className="wishes-form-field">
                Written Message
                <textarea
                  maxLength={600}
                  rows={5}
                  value={writtenMessage}
                  onChange={(event) => setWrittenMessage(event.target.value)}
                  placeholder="Write a lovely birthday wish or share a special memory..."
                  required
                />
                <span className="wishes-character-count" aria-live="polite">
                  {writtenMessage.length} / 600
                </span>
              </label>
            )}

            {activeMethod === "voice" && (
              <div className="wishes-form-field wishes-voice-field">
                <span>Record a voice wish <span className="wishes-optional">Up to 60 seconds · 5 MB</span></span>
                <div className="wishes-record-controls">
                  {!isRecording ? (
                    <button type="button" className="wishes-action-button" onClick={() => void startRecording()} disabled={isRequestingMicrophone}>
                      <Mic size={17} /> {isRequestingMicrophone ? "Waiting for microphone…" : voiceBlob ? "Record again" : "Start recording"}
                    </button>
                  ) : (
                    <button type="button" className="wishes-action-button is-recording" onClick={stopRecording}>
                      <Pause size={17} /> Stop recording
                    </button>
                  )}
                  {voiceBlob && !isRecording && (
                    <button type="button" className="wishes-text-button" onClick={clearRecording}>
                      Remove recording
                    </button>
                  )}
                </div>
                {isRequestingMicrophone && <p className="wishes-recording-status" role="status">Waiting for microphone permission. Your microphone is requested only after you choose to record.</p>}
                {isRecording && <p className="wishes-recording-status" role="status">Recording… maximum 60 seconds.</p>}
                {voiceBlob && audioPreviewUrlRef.current && (
                  <div className="wishes-audio-preview">
                    <audio controls preload="metadata" src={audioPreviewUrlRef.current}>
                      Audio playback is not supported in this browser.
                    </audio>
                    <span>{voiceDuration}s · preview</span>
                  </div>
                )}
                {recordingError && <p className="wishes-inline-error" role="alert">{recordingError}</p>}
              </div>
            )}

            {activeMethod === "photo" && (
              <>
                <div className="wishes-form-field">
                  <label htmlFor="wish-photo">Photograph <span className="wishes-optional">JPG, PNG or WebP · up to 8 MB</span></label>
                  <input
                    id="wish-photo"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                    onChange={(event) => {
                      const file = event.target.files?.[0] ?? null;
                      setPhotoError("");
                      if (
                        file &&
                        !["image/jpeg", "image/png", "image/webp"].includes(file.type)
                      ) {
                        setPhotoFile(null);
                        setPhotoError("Choose a JPG, PNG or WebP photograph.");
                      } else if (file && file.size > 8 * 1024 * 1024) {
                        setPhotoFile(null);
                        setPhotoError("Choose a photograph smaller than 8 MB.");
                      } else {
                        setPhotoFile(file);
                      }
                      event.currentTarget.value = "";
                    }}
                    aria-describedby={photoError ? "wish-photo-error" : undefined}
                  />
                  {photoError && <p className="wishes-inline-error" id="wish-photo-error" role="alert">{photoError}</p>}
                </div>
                {photoFile && (
                  <div className="wishes-photo-preview">
                    {photoPreviewUrl ? (
                      <img src={photoPreviewUrl} alt="Selected photo wish preview" />
                    ) : (
                      <p role="status">Preparing photo preview…</p>
                    )}
                    <button type="button" className="wishes-text-button" onClick={() => setPhotoFile(null)}>
                      Remove photo
                    </button>
                    <p>{photoFile.name}</p>
                  </div>
                )}
                <label className="wishes-form-field">
                  Caption <span className="wishes-optional">Optional</span>
                  <input
                    type="text"
                    maxLength={160}
                    value={photoCaption}
                    onChange={(event) => setPhotoCaption(event.target.value)}
                    placeholder="Add a note about this memory"
                  />
                </label>
              </>
            )}

            {submissionError && <p className="wishes-inline-error" role="alert">{submissionError}</p>}
            {successMessage && <p className="wishes-success" role="status">{successMessage}</p>}
            <button type="submit" className="wishes-submit-button"             disabled={isSubmitting || isRecording || isRequestingMicrophone}>
              {isSubmitting ? "Saving your birthday wish…" : "Send Birthday Wish"}
              <Send size={16} />
            </button>
          </form>
          <p className="wishes-privacy-note">
            Your name and message are visible to the parents managing this local demo.
            Do not include private contact details. Voice and photo wishes are stored in this browser.
          </p>
        </div>

        <div className="wishes-memory-panel">
          <div className="wishes-memory-heading">
            <div>
              <p className="wishes-eyebrow">MEMORIES TO TREASURE</p>
              <h3>A Collection of Happy Memories</h3>
            </div>
            <div className="wishes-memory-heading-aside">
              <span aria-hidden="true">🦁</span>
              <div
                className="wishes-carousel-top-controls"
                role="group"
                aria-label="Wish carousel position"
              >
                <button
                  type="button"
                  className="wishes-carousel-arrow"
                  aria-label="Previous wishes"
                  onClick={showPreviousWishPage}
                  disabled={currentWishPage === 0 || wishPageCount === 0}
                >
                  <GalleryArrow direction="previous" />
                </button>
                <span className="wishes-carousel-counter" aria-live="polite" aria-atomic="true">
                  {String(wishPageCount ? currentWishPage + 1 : 0).padStart(2, "0")}
                  <span aria-hidden="true"> / </span>
                  {String(wishPageCount).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  className="wishes-carousel-arrow"
                  aria-label="Next wishes"
                  onClick={showNextWishPage}
                  disabled={currentWishPage >= wishPageCount - 1 || wishPageCount === 0}
                >
                  <GalleryArrow direction="next" />
                </button>
              </div>
            </div>
          </div>
          <p className="wishes-memory-description">
            Beautiful wishes, loving messages and joyful moments shared by family and friends.
          </p>
          <div className="wishes-wall-filters" role="group" aria-label="Filter published wishes">
            {[
              { id: "all", label: "All Wishes" },
              { id: "written", label: "Written Messages" },
              { id: "voice", label: "Voice Wishes" },
              { id: "photo", label: "Picture Memories" },
            ].map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={activeFilter === id ? "is-active" : ""}
                aria-pressed={activeFilter === id}
                onClick={() => {
                  setActiveFilter(id as "all" | WishType);
                  setCurrentWishPage(0);
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {loadingError && <p className="wishes-inline-error" role="alert">{loadingError}</p>}
          {demoVoiceError && <p className="wishes-inline-error" role="alert">{demoVoiceError}</p>}
          <div
            className="wishes-carousel-viewport"
            role="region"
            aria-label="Birthday wishes carousel"
            aria-roledescription="carousel"
            tabIndex={0}
            onKeyDown={handleWishCarouselKeyDown}
            onTouchStart={handleWishCarouselTouchStart}
            onTouchEnd={handleWishCarouselTouchEnd}
          >
          {isLoading ? (
            <p className="wishes-empty" role="status">Opening the scrapbook…</p>
          ) : visibleRecords.length === 0 &&
            demoWrittenToShow.length === 0 &&
            demoVoicesToShow.length === 0 &&
            demoPhotosToShow.length === 0 ? (
            <div className="wishes-empty">
              <span aria-hidden="true">🦒 ✨ 🐒</span>
              <h4>Every Beautiful Memory Starts With You!</h4>
              <p>
                Be among the first to share a birthday wish. Your message will bring an
                extra smile to this special celebration.
              </p>
              <small>Your wish will appear here once the parents approve it.</small>
            </div>
          ) : (
            <div
              className="wishes-carousel-track"
              style={{
                transform: `translate3d(-${currentWishPage * 100}%, 0, 0)`,
              }}
            >
              {demoWrittenToShow.map((wish, index) => (
                <article
                  className="wish-memory-card is-written is-demo-wish"
                  key={wish.id}
                  style={{ "--wish-index": index } as CSSProperties}
                >
                  <div className="wish-memory-topline">
                    <span aria-hidden="true">✦</span>
                  </div>
                  <p className="wish-memory-message">{wish.message}</p>
                  <p className="wish-memory-author">
                    With love, <strong>{wish.guestName}</strong>
                  </p>
                </article>
              ))}
              {demoVoicesToShow.map((wish, index) => (
                <DemoVoiceWishCard
                  wish={wish}
                  playback={demoVoicePlayback}
                  onToggle={toggleDemoVoice}
                  onStop={stopDemoVoice}
                  key={wish.id}
                  style={{ "--wish-index": index } as CSSProperties}
                />
              ))}
              {demoPhotosToShow.map((wish, index) => (
                <article
                  className={`wish-memory-card is-photo is-demo-photo is-photo-${index % 3}`}
                  key={wish.id}
                  style={{ "--wish-index": index } as CSSProperties}
                >
                  <div className="wish-memory-topline">
                    <span aria-hidden="true">❋</span>
                  </div>
                  <figure className="wish-memory-photo">
                    <button
                      type="button"
                      className="wish-demo-photo-open"
                      aria-label={`Open illustrative stock memory: ${wish.caption}`}
                      onClick={(event) => {
                        photoViewerTriggerRef.current = event.currentTarget;
                        setSelectedPhotoId(wish.id);
                      }}
                    >
                      <img
                        src={wish.src}
                        alt={wish.alt}
                        width="900"
                        height="700"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="wish-photo-zoom-mark" aria-hidden="true">+</span>
                    </button>
                    <figcaption>{wish.caption}</figcaption>
                  </figure>
                  <p className="wish-memory-author">
                    Shared by <strong>{wish.guestName}</strong>
                  </p>
                  <a
                    className="wish-photo-source"
                    href={wish.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Illustrative stock photo · Pexels
                  </a>
                </article>
              ))}
              {visibleRecords.map((wish, index) => (
                <article
                  className={`wish-memory-card is-${wish.type}`}
                  key={wish.id}
                  style={{ "--wish-index": index } as CSSProperties}
                >
                  <div className="wish-memory-topline">
                    <span aria-hidden="true">
                      {wish.type === "written" ? "✦" : wish.type === "voice" ? "♫" : "❋"}
                    </span>
                    <span className="wish-approved-badge">PARENT APPROVED</span>
                    <time dateTime={wish.submittedAt}>
                      {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(wish.submittedAt))}
                    </time>
                  </div>
                  {wish.type === "written" && <p className="wish-memory-message">{wish.message}</p>}
                  {wish.type === "voice" && mediaUrls[wish.id] && (
                    <div className="wish-memory-audio">
                      <Mic size={18} />
                      <audio controls preload="none" src={mediaUrls[wish.id]}>
                        Audio playback is not supported in this browser.
                      </audio>
                      <small>{wish.durationSeconds}s voice wish</small>
                    </div>
                  )}
                  {wish.type === "photo" && mediaUrls[wish.id] && (
                    <figure className="wish-memory-photo">
                      <button
                        type="button"
                        className="wish-demo-photo-open"
                        aria-label={`Open picture memory shared by ${wish.guestName}`}
                        onClick={(event) => {
                          photoViewerTriggerRef.current = event.currentTarget;
                          setSelectedPhotoId(wish.id);
                        }}
                      >
                        <img
                          src={mediaUrls[wish.id]}
                          alt={wish.caption ? `Picture memory shared by ${wish.guestName}: ${wish.caption}` : `Picture memory shared by ${wish.guestName}`}
                          width="900"
                          height="700"
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="wish-photo-zoom-mark" aria-hidden="true">+</span>
                      </button>
                      {wish.caption && <figcaption>{wish.caption}</figcaption>}
                    </figure>
                  )}
                  <p className="wish-memory-author">With love, <strong>{wish.guestName}</strong></p>
                </article>
              ))}
            </div>
          )}
          </div>
          <div className="wishes-carousel-bottom-controls">
            <button
              type="button"
              className="wishes-carousel-text-button"
              onClick={showPreviousWishPage}
              disabled={currentWishPage === 0 || wishPageCount === 0}
            >
              <GalleryArrow direction="previous" />
              <span>Previous</span>
            </button>
            <div className="wishes-carousel-pagination" aria-label="Choose carousel page">
              <div
                className="wishes-carousel-progress"
                role="progressbar"
                aria-label="Carousel progress"
                aria-valuemin={0}
                aria-valuemax={wishPageCount}
                aria-valuenow={wishPageCount ? currentWishPage + 1 : 0}
              >
                <span
                  style={{
                    width: wishPageCount
                      ? `${((currentWishPage + 1) / wishPageCount) * 100}%`
                      : "0%",
                  }}
                />
              </div>
              <div className="wishes-carousel-dots">
                {Array.from({ length: wishPageCount }, (_, page) => (
                  <button
                    key={page}
                    type="button"
                    aria-label={`Go to wishes page ${page + 1}`}
                    aria-current={currentWishPage === page ? "page" : undefined}
                    className={currentWishPage === page ? "is-active" : ""}
                    onClick={() => setCurrentWishPage(page)}
                  />
                ))}
              </div>
            </div>
            <button
              type="button"
              className="wishes-carousel-text-button"
              onClick={showNextWishPage}
              disabled={currentWishPage >= wishPageCount - 1 || wishPageCount === 0}
            >
              <span>Next</span>
              <GalleryArrow direction="next" />
            </button>
          </div>
        </div>
      </div>
      {selectedPhoto && selectedPhotoIndex >= 0 && createPortal(
        <div
          className="gallery-viewer wish-photo-viewer"
          role="dialog"
          aria-modal="true"
          aria-label="Birthday picture memory viewer"
          ref={photoViewerRef}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedPhotoId(null);
            }
          }}
        >
          <button
            className="viewer-close"
            type="button"
            aria-label="Close picture memory viewer"
            onClick={() => setSelectedPhotoId(null)}
            ref={photoViewerCloseRef}
          >
            <GalleryCloseIcon />
          </button>
          <button
            className="viewer-navigation viewer-previous"
            type="button"
            aria-label="Previous picture memory"
            onClick={showPreviousWishPhoto}
          >
            <GalleryArrow direction="previous" />
          </button>
          <figure className="viewer-figure" key={selectedPhoto.id}>
            <div className="viewer-image viewer-image-landscape">
              <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
            </div>
            <figcaption className="viewer-caption">
              <span>{selectedPhoto.caption}</span>
              <span>
                {selectedPhoto.isDemo
                  ? `Illustrative stock image · shared by ${selectedPhoto.guestName} · demo`
                  : `Shared by ${selectedPhoto.guestName} · parent-approved`}
              </span>
              {selectedPhoto.sourceUrl && (
                <a
                  href={selectedPhoto.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Pexels photo source
                </a>
              )}
            </figcaption>
            <p className="viewer-counter" aria-live="polite">
              {String(selectedPhotoIndex + 1).padStart(2, "0")} &nbsp;/&nbsp;{" "}
              {String(photoMemories.length).padStart(2, "0")}
            </p>
          </figure>
          <button
            className="viewer-navigation viewer-next"
            type="button"
            aria-label="Next picture memory"
            onClick={showNextWishPhoto}
          >
            <GalleryArrow direction="next" />
          </button>
          <span className="viewer-keyboard-hint" aria-hidden="true">
            USE THE ARROW KEYS TO WANDER
          </span>
        </div>,
        document.body,
      )}
    </section>
  );
}

type GuestManagementPanelProps = {
  records: GuestRecord[];
  onRecordsChange: (records: GuestRecord[]) => void;
  loadError: string;
};

function GuestManagementPanel({
  records,
  onRecordsChange,
  loadError,
}: GuestManagementPanelProps) {
  const [query, setQuery] = useState("");
  const [attendanceFilter, setAttendanceFilter] = useState<"all" | RsvpAttendance>("all");
  const [mealFilter, setMealFilter] = useState<"all" | MealPreference>("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<GuestRecordInput | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [actionError, setActionError] = useState("");

  const accepted = records.filter((record) => record.attendance === "accept");
  const declinedCount = records.length - accepted.length;
  const expectedResponses = eventInfo.guestManagement.invitedResponseCount;
  const pendingCount =
    Number.isInteger(expectedResponses) && expectedResponses > 0
      ? Math.max(expectedResponses - records.length, 0)
      : null;
  const confirmedGuests = accepted.reduce(
    (total, record) => total + record.guestCount,
    0,
  );
  const confirmedMealGuests = accepted.flatMap(
    (record) => record.mealGuests ?? [],
  );
  const mealCounts: Record<MealPreference, number> = {
    Vegetarian: 0,
    "Non-Vegetarian": 0,
    Vegan: 0,
    Jain: 0,
    Other: 0,
  };
  for (const guest of confirmedMealGuests) {
    if (guest.preference) {
      mealCounts[guest.preference] += 1;
    }
  }
  const dietaryNotes = accepted.flatMap((record) =>
    (record.mealGuests ?? [])
      .filter((guest) => guest.dietaryRestrictions || guest.allergies)
      .map((guest) => ({
        guestName: guest.name || record.guestName,
        restrictions: guest.dietaryRestrictions,
        allergies: guest.allergies,
      })),
  );
  const adultCount = confirmedMealGuests.filter(
    (guest) => guest.category === "Adult",
  ).length;
  const childCount = confirmedMealGuests.filter(
    (guest) => guest.category === "Child",
  ).length;

  const visibleRecords = records
    .filter((record) => {
      const searchText = [
        record.guestName,
        record.email,
        record.phone,
        record.message,
        ...(record.mealGuests ?? []).flatMap((guest) => [
          guest.name,
          guest.category,
          guest.preference,
          guest.customPreference,
          guest.dietaryRestrictions,
          guest.allergies,
        ]),
      ]
        .join(" ")
        .toLocaleLowerCase();
      return (
        searchText.includes(query.trim().toLocaleLowerCase()) &&
        (attendanceFilter === "all" || record.attendance === attendanceFilter) &&
        (mealFilter === "all" ||
          (record.mealGuests ?? []).some(
            (guest) => guest.preference === mealFilter,
          ))
      );
    })
    .sort((first, second) => {
      const difference =
        new Date(first.submittedAt).getTime() -
        new Date(second.submittedAt).getTime();
      return sortOrder === "newest" ? -difference : difference;
    });

  const reloadAfterError = (error: unknown) => {
    const message =
      error instanceof Error ? error.message : "The guest record could not be updated.";
    setActionError(message);
  };

  const startEditing = (record: GuestRecord) => {
    setActionError("");
    setEditingId(record.id);
    setEditValues({
      guestName: record.guestName,
      email: record.email,
      phone: record.phone,
      guestCount: record.guestCount,
      attendance: record.attendance,
      message: record.message,
      mealGuests: record.mealGuests ?? [],
    });
  };

  const saveEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingId || !editValues || isSaving) {
      return;
    }
    if (!editValues.guestName.trim() || !Number.isSafeInteger(editValues.guestCount) || editValues.guestCount < 1) {
      setActionError("Enter a guest name and a guest count of at least one.");
      return;
    }
    setIsSaving(true);
    setActionError("");
    try {
      const updated = await localDemoGuestService.update(editingId, {
        ...editValues,
        guestName: editValues.guestName.trim(),
        email: editValues.email.trim(),
        phone: editValues.phone.trim(),
        message: editValues.message.trim(),
        mealGuests:
          editValues.attendance === "accept"
            ? resizeMealGuests(
                editValues.mealGuests ?? [],
                editValues.guestCount,
                editValues.guestName.trim(),
              )
            : [],
      });
      onRecordsChange(records.map((record) => (record.id === updated.id ? updated : record)));
      setEditingId(null);
      setEditValues(null);
    } catch (error) {
      reloadAfterError(error);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteRecord = async (record: GuestRecord) => {
    if (!window.confirm(`Delete the demo RSVP from ${record.guestName}? This cannot be undone.`)) {
      return;
    }
    setActionError("");
    try {
      await localDemoGuestService.remove(record.id);
      onRecordsChange(records.filter((item) => item.id !== record.id));
      if (editingId === record.id) {
        setEditingId(null);
        setEditValues(null);
      }
    } catch (error) {
      reloadAfterError(error);
    }
  };

  const exportCsv = () => {
    if (records.length === 0) {
      return;
    }
    const blob = new Blob(["\uFEFF", buildGuestCsv(records)], {
      type: "text/csv;charset=utf-8",
    });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "little-wild-one-demo-rsvps.csv";
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  };

  return (
    <section className="guest-manager" id="guest-manager" aria-labelledby="guest-manager-title">
      <header className="guest-manager-header">
        <div>
          <p className="guest-manager-kicker">Organizer tools · local demo</p>
          <h3 id="guest-manager-title">Little guest book</h3>
          <p>These responses are saved in this browser only and are not shared across devices.</p>
        </div>
        <button
          className="guest-export-button"
          type="button"
          onClick={exportCsv}
          disabled={records.length === 0}
        >
          Export meal & RSVP CSV
          <span aria-hidden="true">↓</span>
        </button>
      </header>

      {loadError && <p className="guest-manager-error" role="alert">{loadError}</p>}
      {actionError && <p className="guest-manager-error" role="alert">{actionError}</p>}

      <div className="guest-analytics" aria-label="RSVP summary">
        <article><span>Total responses</span><strong>{records.length}</strong></article>
        <article><span>Accepted</span><strong>{accepted.length}</strong></article>
        <article><span>Declined</span><strong>{declinedCount}</strong></article>
        <article><span>Confirmed attendees</span><strong>{confirmedGuests}</strong></article>
        <article>
          <span>Pending responses</span>
          <strong>{pendingCount === null ? "—" : pendingCount}</strong>
          {pendingCount === null && <small>Set invited response count in event configuration</small>}
        </article>
      </div>

      <section className="meal-analytics" aria-labelledby="meal-analytics-title">
        <div className="meal-analytics-heading">
          <Utensils size={18} />
          <div><h4 id="meal-analytics-title">Meal preparation summary</h4><p>Calculated from confirmed attendee details.</p></div>
        </div>
        <div className="meal-analytics-grid">
          {(Object.keys(mealCounts) as MealPreference[]).map((preference) => (
            <article key={preference}>
              <span>{preference === "Other" ? "Other / special" : preference}</span>
              <strong>{mealCounts[preference]}</strong>
            </article>
          ))}
          <article><span>Adults</span><strong>{adultCount}</strong></article>
          <article><span>Children</span><strong>{childCount}</strong></article>
          <article><span>Confirmed attendee details</span><strong>{confirmedMealGuests.length} / {confirmedGuests}</strong></article>
        </div>
        <details className="meal-special-requests">
          <summary>Allergies and special requests · {dietaryNotes.length}</summary>
          {dietaryNotes.length === 0 ? (
            <p>No allergies or special dietary notes have been provided.</p>
          ) : (
            <ul>
              {dietaryNotes.map((note, index) => (
                <li key={`${note.guestName}-${index}`}>
                  <strong>{note.guestName}</strong>
                  {note.restrictions && <span>Dietary: {note.restrictions}</span>}
                  {note.allergies && <span>Allergies: {note.allergies}</span>}
                </li>
              ))}
            </ul>
          )}
        </details>
      </section>

      <div className="guest-list-toolbar">
        <label>
          Search guests
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, contact or message"
          />
        </label>
        <label>
          Attendance
          <select
            value={attendanceFilter}
            onChange={(event) => setAttendanceFilter(event.target.value as "all" | RsvpAttendance)}
          >
            <option value="all">All responses</option>
            <option value="accept">Accepted</option>
            <option value="decline">Declined</option>
          </select>
        </label>
        <label>
          Meal preference
          <select
            value={mealFilter}
            onChange={(event) =>
              setMealFilter(event.target.value as "all" | MealPreference)
            }
          >
            <option value="all">All meals</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Jain">Jain</option>
            <option value="Other">Other / Special</option>
          </select>
        </label>
        <label>
          Submitted
          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value as "newest" | "oldest")}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>

      {records.length === 0 ? (
        <p className="guest-list-empty">
          No demo responses yet. New RSVPs from this browser will appear here.
        </p>
      ) : visibleRecords.length === 0 ? (
        <p className="guest-list-empty">No guests match these search and filter choices.</p>
      ) : (
        <div className="guest-list" aria-live="polite">
          {visibleRecords.map((record) => (
            <article className="guest-record" key={record.id}>
              {editingId === record.id && editValues ? (
                <form className="guest-edit-form" onSubmit={saveEdit}>
                  <h4>Edit RSVP · {record.guestName}</h4>
                  <div className="guest-edit-fields">
                    <label>
                      Guest name
                      <input
                        value={editValues.guestName}
                        maxLength={100}
                        required
                        onChange={(event) => setEditValues({ ...editValues, guestName: event.target.value })}
                      />
                    </label>
                    <label>
                      Email
                      <input
                        type="email"
                        value={editValues.email}
                        onChange={(event) => setEditValues({ ...editValues, email: event.target.value })}
                      />
                    </label>
                    <label>
                      Phone
                      <input
                        type="tel"
                        value={editValues.phone}
                        onChange={(event) => setEditValues({ ...editValues, phone: event.target.value })}
                      />
                    </label>
                    <label>
                      Guest count
                      <input
                        type="number"
                        min="1"
                        step="1"
                        required
                        value={editValues.guestCount}
                        onChange={(event) => setEditValues({ ...editValues, guestCount: Number(event.target.value) })}
                      />
                    </label>
                    <label>
                      Attendance
                      <select
                        value={editValues.attendance}
                        onChange={(event) => setEditValues({ ...editValues, attendance: event.target.value as RsvpAttendance })}
                      >
                        <option value="accept">Accepted</option>
                        <option value="decline">Declined</option>
                      </select>
                    </label>
                    <label className="guest-edit-message">
                      Birthday message
                      <textarea
                        rows={3}
                        maxLength={1000}
                        value={editValues.message}
                        onChange={(event) => setEditValues({ ...editValues, message: event.target.value })}
                      />
                    </label>
                  </div>
                  <div className="guest-record-actions">
                    <button className="guest-action-primary" type="submit" disabled={isSaving}>
                      {isSaving ? "Saving…" : "Save changes"}
                    </button>
                    <button
                      className="guest-action-secondary"
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setEditValues(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="guest-record-summary">
                    <div>
                      <h4>{record.guestName}</h4>
                      <p>
                        <span className={`guest-attendance-badge is-${record.attendance}`}>
                          {record.attendance === "accept" ? "Accepted" : "Declined"}
                        </span>
                        <span>{record.guestCount} {record.guestCount === 1 ? "guest" : "guests"}</span>
                        <time dateTime={record.submittedAt}>{formatGuestSubmittedAt(record.submittedAt)}</time>
                      </p>
                    </div>
                    <div className="guest-record-actions">
                      <button className="guest-action-secondary" type="button" onClick={() => startEditing(record)}>
                        Edit
                      </button>
                      <button className="guest-action-danger" type="button" onClick={() => void deleteRecord(record)}>
                        Delete
                      </button>
                    </div>
                  </div>
                  <details className="guest-record-details">
                    <summary>View guest details</summary>
                    <dl>
                      <div><dt>Email</dt><dd>{record.email || "Not provided"}</dd></div>
                      <div><dt>Phone</dt><dd>{record.phone || "Not provided"}</dd></div>
                      <div><dt>Birthday message</dt><dd>{record.message || "No message"}</dd></div>
                      <div><dt>Submitted</dt><dd>{formatGuestSubmittedAt(record.submittedAt)}</dd></div>
                    </dl>
                    {record.attendance === "accept" && (record.mealGuests?.length ?? 0) > 0 && (
                      <div className="guest-meal-details">
                        <h5>Individual meal preferences</h5>
                        <ul>
                          {record.mealGuests?.map((guest, index) => (
                            <li key={`${record.id}-meal-${index}`}>
                              <strong>{guest.name || `Attendee ${index + 1}`}</strong>
                              <span>{guest.category} · {guest.preference || "Preference not recorded"}{guest.preference === "Other" && guest.customPreference ? `: ${guest.customPreference}` : ""}</span>
                              {guest.dietaryRestrictions && <span>Dietary: {guest.dietaryRestrictions}</span>}
                              {guest.allergies && <span>Allergies: {guest.allergies}</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </details>
                </>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function WishManagementPanel({
  records,
  onRecordsChange,
  loadError,
  isLoading,
}: {
  records: WishRecord[];
  onRecordsChange: (records: WishRecord[]) => void;
  loadError: string;
  isLoading: boolean;
}) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | WishType>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | WishStatus>("all");
  const [actionError, setActionError] = useState("");
  const [mediaUrls, setMediaUrls] = useState<Record<string, string>>({});
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const urls: string[] = [];
    void (async () => {
      try {
        const entries: [string, string][] = [];
        for (const wish of records) {
          if (wish.type === "written") {
            continue;
          }
          const blob = await localDemoWishService.getMedia(wish.id);
          if (blob) {
            const url = URL.createObjectURL(blob);
            urls.push(url);
            entries.push([wish.id, url]);
          }
        }
        if (active) {
          setMediaUrls(Object.fromEntries(entries));
        }
      } catch (error) {
        if (active) {
          setActionError(
            error instanceof Error
              ? error.message
              : "A submitted photo or voice recording could not be opened.",
          );
        }
      }
    })();
    return () => {
      active = false;
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [records]);

  const counts = {
    total: records.length,
    pending: records.filter((wish) => wish.status === "pending").length,
    approved: records.filter((wish) => wish.status === "approved").length,
    rejected: records.filter((wish) => wish.status === "rejected").length,
    written: records.filter((wish) => wish.type === "written").length,
    voice: records.filter((wish) => wish.type === "voice").length,
    photo: records.filter((wish) => wish.type === "photo").length,
  };
  const visibleRecords = records
    .filter((wish) => {
      const matchesSearch = `${wish.guestName} ${wish.message} ${wish.caption}`
        .toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase());
      return (
        matchesSearch &&
        (typeFilter === "all" || wish.type === typeFilter) &&
        (statusFilter === "all" || wish.status === statusFilter)
      );
    })
    .sort(
      (first, second) =>
        Date.parse(second.submittedAt) - Date.parse(first.submittedAt),
    );

  const setStatus = async (wish: WishRecord, status: WishStatus) => {
    if (
      status === "rejected" &&
      !window.confirm(`Reject the wish from ${wish.guestName}?`)
    ) {
      return;
    }
    setBusyId(wish.id);
    setActionError("");
    try {
      const updated = await localDemoWishService.updateStatus(wish.id, status);
      onRecordsChange(records.map((record) => record.id === updated.id ? updated : record));
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "The wish could not be updated.");
    } finally {
      setBusyId(null);
    }
  };

  const setFeatured = async (wish: WishRecord, featured: boolean) => {
    setBusyId(wish.id);
    setActionError("");
    try {
      const updated = await localDemoWishService.setFeatured(wish.id, featured);
      onRecordsChange(records.map((record) => record.id === updated.id ? updated : record));
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "The wish could not be featured.");
    } finally {
      setBusyId(null);
    }
  };

  const deleteWish = async (wish: WishRecord) => {
    if (
      !window.confirm(
        `Delete the ${wish.type} wish from ${wish.guestName}? This cannot be undone.`,
      )
    ) {
      return;
    }
    setBusyId(wish.id);
    setActionError("");
    try {
      const cleanupWarning = await localDemoWishService.remove(wish.id);
      onRecordsChange(records.filter((record) => record.id !== wish.id));
      if (cleanupWarning) {
        setActionError(cleanupWarning);
      }
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "The wish could not be deleted.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section className="wish-admin-panel" aria-labelledby="wish-admin-title">
      <header className="wish-admin-heading">
        <div>
          <p className="admin-eyebrow">LOCAL DEMO · PARENT REVIEW REQUIRED</p>
          <h3 id="wish-admin-title">Wishes management</h3>
          <p>Only approved wishes appear on the public memory wall in this browser.</p>
        </div>
        <span className="wish-admin-illustration" aria-hidden="true">🦒 ✦ 🐒</span>
      </header>
      <p className="admin-demo-notice">
        <CircleAlert size={15} /> Wish content and media are stored locally in this browser.
        There is no cross-device synchronization or secure administrator sign-in.
      </p>
      {loadError && <p className="admin-inline-error" role="alert">{loadError}</p>}
      {actionError && <p className="admin-inline-error" role="alert">{actionError}</p>}
      <div className="wish-admin-stats" aria-label="Wish submission summary">
        <article><span>Total submissions</span><strong>{counts.total}</strong></article>
        <article><span>Pending approval</span><strong>{counts.pending}</strong></article>
        <article><span>Approved wishes</span><strong>{counts.approved}</strong></article>
        <article><span>Rejected wishes</span><strong>{counts.rejected}</strong></article>
        <article><span>Written</span><strong>{counts.written}</strong></article>
        <article><span>Voice</span><strong>{counts.voice}</strong></article>
        <article><span>Picture</span><strong>{counts.photo}</strong></article>
      </div>
      <div className="wish-admin-toolbar">
        <label>
          Search wishes
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Guest name or message"
          />
        </label>
        <label>
          Submission type
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value as "all" | WishType)}
          >
            <option value="all">All types</option>
            <option value="written">Written</option>
            <option value="voice">Voice</option>
            <option value="photo">Picture</option>
          </select>
        </label>
        <label>
          Approval status
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as "all" | WishStatus)}
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
      </div>
      {isLoading ? (
        <p className="wish-admin-empty" role="status">Loading demo wishes…</p>
      ) : records.length === 0 ? (
        <p className="wish-admin-empty">No demo wishes have been submitted yet.</p>
      ) : visibleRecords.length === 0 ? (
        <p className="wish-admin-empty">No wishes match these filters.</p>
      ) : (
        <div className="wish-admin-list">
          {visibleRecords.map((wish) => (
            <article className="wish-admin-record" key={wish.id}>
              <div className="wish-admin-record-header">
                <div>
                  <span className={`wish-type-badge is-${wish.type}`}>{wish.type} wish</span>
                  <span className={`wish-status-badge is-${wish.status}`}>{wish.status}</span>
                  <h4>{wish.guestName}</h4>
                  <time dateTime={wish.submittedAt}>{formatGuestSubmittedAt(wish.submittedAt)}</time>
                </div>
                <div className="wish-admin-actions">
                  {wish.status !== "approved" && (
                    <button
                      type="button"
                      className="wish-approve-button"
                      disabled={busyId === wish.id}
                      onClick={() => void setStatus(wish, "approved")}
                    >
                      {busyId === wish.id ? "Saving…" : "Approve"}
                    </button>
                  )}
                  {wish.status === "approved" && (
                    <button
                      type="button"
                      className="wish-approve-button"
                      disabled={busyId === wish.id}
                      aria-pressed={wish.featured === true}
                      onClick={() => void setFeatured(wish, wish.featured !== true)}
                    >
                      {wish.featured === true ? "Featured on site" : "Feature on site"}
                    </button>
                  )}
                  {wish.status !== "rejected" && (
                    <button
                      type="button"
                      className="wish-reject-button"
                      disabled={busyId === wish.id}
                      onClick={() => void setStatus(wish, "rejected")}
                    >
                      Reject
                    </button>
                  )}
                  <button
                    type="button"
                    className="wish-delete-button"
                    disabled={busyId === wish.id}
                    onClick={() => void deleteWish(wish)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {wish.type === "written" && (
                <blockquote className="wish-admin-message">{wish.message}</blockquote>
              )}
              {wish.type === "voice" && (
                <div className="wish-admin-media">
                  {mediaUrls[wish.id] ? (
                    <audio controls preload="none" src={mediaUrls[wish.id]}>
                      Audio playback is not supported in this browser.
                    </audio>
                  ) : <p>Voice recording unavailable in this browser storage.</p>}
                  <small>{wish.durationSeconds} seconds · no autoplay</small>
                </div>
              )}
              {wish.type === "photo" && (
                <div className="wish-admin-media">
                  {mediaUrls[wish.id] ? (
                    <img src={mediaUrls[wish.id]} alt={`Photo wish submitted by ${wish.guestName}`} loading="lazy" />
                  ) : <p>Photo unavailable in this browser storage.</p>}
                  {wish.caption && <p>{wish.caption}</p>}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function GrandFinale() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      section.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleBackToTop = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, 0);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappUrl = buildWhatsAppShareUrl("invitation");

  return (
    <footer
      className="finale-section"
      id="finale"
      ref={sectionRef}
      aria-labelledby="finale-title"
    >
      <div className="finale-heading">
        <p className="finale-kicker">
          <span aria-hidden="true" />
          And so the story goes on
          <span aria-hidden="true" />
        </p>
        <h2 id="finale-title">
          {formatEventCopy(eventInfo.content.footerHeading)}
        </h2>
        <p>{formatEventCopy(eventInfo.content.footerIntroduction)}</p>
      </div>

      <div className="finale-scene" role="img" aria-label="A baby elephant, giraffe and lion beneath a warm savanna sunset">
        <span className="finale-sunset" aria-hidden="true" />
        <span className="finale-scene-caption" aria-hidden="true">
          OUR LITTLE WORLD OF WONDER
        </span>
        <SafariLandscape />
        <span className="finale-scene-note" aria-hidden="true">
          A curious heart · a world of wonder
        </span>
      </div>

      <div className="finale-signoff">
        {isProvided(eventInfo.baby.parentsNames) && (
          <p className="finale-signoff-kicker">
            With love, {eventInfo.baby.parentsNames}
          </p>
        )}
        <p className="finale-baby-name">{getBabyName()}</p>
        <p className="finale-date">{getBirthdayDisplayDate()}</p>
        <p className="finale-thank-you">
          {formatEventCopy(eventInfo.content.footerThankYou)}
        </p>
      </div>

      <div className="finale-actions">
        {whatsappUrl ? (
          <a
            className="finale-share-button"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share this invitation on WhatsApp"
          >
            <WhatsAppIcon />
            Share the invitation
          </a>
        ) : (
          <span className="finale-share-button is-disabled" aria-disabled="true">
            <WhatsAppIcon />
            WhatsApp sharing unavailable
          </span>
        )}
        <button
          className="finale-top-button"
          type="button"
          onClick={handleBackToTop}
        >
          <span className="finale-top-arrow" aria-hidden="true">↑</span>
          Back to the beginning
        </button>
      </div>

      <div className="finale-colophon">
        <a href="#home" aria-label="Little Wild One home">
          Little Wild One
        </a>
        <span>Made with love, for a little one</span>
        <span>✳</span>
      </div>
    </footer>
  );
}

function useJungleAmbience() {
  const contextRef = useRef<AudioContext | null>(null);
  const chirpTimerRef = useRef<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundMessage, setSoundMessage] = useState(
    "Original synthesized ambience is off.",
  );

  const stopSound = () => {
    if (chirpTimerRef.current !== null) {
      window.clearTimeout(chirpTimerRef.current);
      chirpTimerRef.current = null;
    }
    const context = contextRef.current;
    contextRef.current = null;
    if (context && context.state !== "closed") {
      void context.close();
    }
    setSoundEnabled(false);
  };

  const toggleSound = async () => {
    if (soundEnabled) {
      stopSound();
      setSoundMessage("Original synthesized ambience is off.");
      return;
    }

    if (typeof window.AudioContext === "undefined") {
      setSoundMessage("Ambient sound is not supported in this browser.");
      return;
    }

    try {
      const context = new window.AudioContext();
      const buffer = context.createBuffer(
        1,
        Math.floor(context.sampleRate * 3),
        context.sampleRate,
      );
      const samples = buffer.getChannelData(0);
      for (let index = 0; index < samples.length; index += 1) {
        samples[index] = (Math.random() * 2 - 1) * 0.18;
      }

      const breeze = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const breezeVolume = context.createGain();
      breeze.buffer = buffer;
      breeze.loop = true;
      filter.type = "lowpass";
      filter.frequency.value = 520;
      breezeVolume.gain.value = 0.045;
      breeze.connect(filter);
      filter.connect(breezeVolume);
      breezeVolume.connect(context.destination);
      breeze.start();
      contextRef.current = context;
      await context.resume();

      const chirp = () => {
        const activeContext = contextRef.current;
        if (!activeContext || activeContext.state !== "running") {
          return;
        }
        const oscillator = activeContext.createOscillator();
        const volume = activeContext.createGain();
        const now = activeContext.currentTime;
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(1500, now);
        oscillator.frequency.exponentialRampToValueAtTime(2100, now + 0.12);
        oscillator.frequency.exponentialRampToValueAtTime(1650, now + 0.28);
        volume.gain.setValueAtTime(0.0001, now);
        volume.gain.exponentialRampToValueAtTime(0.012, now + 0.04);
        volume.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
        oscillator.connect(volume);
        volume.connect(activeContext.destination);
        oscillator.start(now);
        oscillator.stop(now + 0.32);
        chirpTimerRef.current = window.setTimeout(chirp, 6200);
      };

      setSoundEnabled(true);
      setSoundMessage("Gentle synthesized ambience is on. Tap to mute.");
      chirpTimerRef.current = window.setTimeout(chirp, 900);
    } catch {
      stopSound();
      setSoundMessage("Ambient sound could not be started. Please try again.");
    }
  };

  useEffect(
    () => () => {
      if (chirpTimerRef.current !== null) {
        window.clearTimeout(chirpTimerRef.current);
      }
      if (contextRef.current && contextRef.current.state !== "closed") {
        void contextRef.current.close();
      }
    },
    [],
  );

  return { soundEnabled, soundMessage, toggleSound };
}

function WelcomeOverlay({
  babyName,
  leaving,
  enterButtonRef,
  overlayRef,
  onEnter,
  onSkip,
}: {
  babyName: string;
  leaving: boolean;
  enterButtonRef: RefObject<HTMLButtonElement | null>;
  overlayRef: RefObject<HTMLDivElement | null>;
  onEnter: () => void;
  onSkip: () => void;
}) {
  return (
    <div
      ref={overlayRef}
      className={`welcome-overlay${leaving ? " is-leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <div className="welcome-scene" aria-hidden="true">
        <span className="welcome-balloon welcome-balloon-one">🎈</span>
        <span className="welcome-balloon welcome-balloon-two">🎈</span>
        <span className="welcome-leaf welcome-leaf-one">🍃</span>
        <span className="welcome-leaf welcome-leaf-two">🌿</span>
        <span className="welcome-butterfly welcome-butterfly-one">🦋</span>
        <span className="welcome-butterfly welcome-butterfly-two">🦋</span>
        <div className="welcome-art-frame">
          <SafariLandscape />
        </div>
        <span className="welcome-firefly welcome-firefly-one" />
        <span className="welcome-firefly welcome-firefly-two" />
        <span className="welcome-firefly welcome-firefly-three" />
      </div>
      <div className="welcome-content">
        <p className="welcome-kicker">A little adventure awaits</p>
        <p className="welcome-baby-name">{babyName}</p>
        <h1 id="welcome-title">Welcome to Our Little Jungle!</h1>
        <p className="welcome-description">
          Follow the trail, meet our jungle friends and celebrate a very special
          birthday celebration.
        </p>
        <button
          ref={enterButtonRef}
          className="welcome-enter-button"
          type="button"
          onClick={onEnter}
        >
          Enter the Adventure <ArrowIcon />
        </button>
        <button className="welcome-skip-button" type="button" onClick={onSkip}>
          Skip the welcome
        </button>
      </div>
    </div>
  );
}

function ConfettiBurst() {
  return (
    <div className="confetti-burst" aria-hidden="true">
      {Array.from({ length: 22 }, (_, index) => (
        <span
          className={`confetti-piece confetti-piece-${(index % 6) + 1}`}
          key={index}
          style={{
            left: `${(index * 37 + 8) % 100}%`,
            animationDelay: `${(index % 7) * 55}ms`,
          }}
        />
      ))}
    </div>
  );
}

type AdminTab =
  | "overview"
  | "profile"
  | "event"
  | "rsvp"
  | "meals"
  | "wishes"
  | "gifts"
  | "streaming"
  | "gallery"
  | "settings"
  | "preview";

type AdminNavigationItem = {
  id: AdminTab;
  label: string;
  icon: typeof LayoutDashboard;
};

const adminNavigation: AdminNavigationItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "profile", label: "Baby Profile", icon: Baby },
  { id: "event", label: "Event Details", icon: CalendarDays },
  { id: "rsvp", label: "Guest Management", icon: UsersRound },
  { id: "meals", label: "Meal Preferences", icon: Utensils },
  { id: "wishes", label: "Birthday Wishes", icon: MessageCircle },
  { id: "gifts", label: "Gift Corner", icon: Gift },
  { id: "streaming", label: "Live Celebration", icon: Radio },
  { id: "gallery", label: "Photo Gallery", icon: Images },
  { id: "settings", label: "Website Settings", icon: Settings },
];

const adminGiftCategories: GiftCategory[] = giftCategories.filter(
  (category): category is GiftCategory => category !== "All",
);

const invitationSectionLabels: { key: AdminSectionKey; label: string }[] = [
  { key: "celebration", label: "Celebration details" },
  { key: "story", label: "Baby's story" },
  { key: "safariTrail", label: "Jungle trail and map" },
  { key: "countdown", label: "Birthday countdown" },
  { key: "location", label: "Venue and directions" },
  { key: "gallery", label: "Photo gallery" },
  { key: "surprise", label: "Special surprise" },
  { key: "gifts", label: "Gift corner" },
  { key: "streaming", label: "Live celebration" },
  { key: "rsvp", label: "RSVP form" },
  { key: "footer", label: "Closing message" },
];

function AdminInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  min,
  max,
  step,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  min?: string;
  max?: string;
  step?: string;
  hint?: string;
}) {
  const id = useId();
  return (
    <label className="admin-field" htmlFor={id}>
      <span>{label}{required && <span className="admin-required"> *</span>}</span>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(event.target.value)}
      />
      {hint && <small>{hint}</small>}
    </label>
  );
}

function AdminTextArea({
  label,
  value,
  onChange,
  rows = 4,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  hint?: string;
}) {
  const id = useId();
  return (
    <label className="admin-field admin-field-wide" htmlFor={id}>
      <span>{label}</span>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {hint && <small>{hint}</small>}
    </label>
  );
}

function AdminToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const id = useId();
  return (
    <label className="admin-toggle" htmlFor={id}>
      <span className="admin-toggle-copy">
        <strong>{label}</strong>
        <small>{description}</small>
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="admin-toggle-track" aria-hidden="true" />
    </label>
  );
}

function createGiftSuggestion(): GiftSuggestion {
  return {
    id:
      typeof window.crypto?.randomUUID === "function"
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    category: "Toys",
    title: "",
    description: "",
    visible: true,
    imageUrl: "",
    imageAlt: "",
    imageSourceUrl: "",
    imageSourceLabel: "Family photo",
    productUrl: "",
  };
}

function createGalleryMemory(src: string, order: number): GalleryMemory {
  return {
    id:
      typeof window.crypto?.randomUUID === "function"
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    order,
    src,
    fallbackSrc: "",
    srcSet: "",
    sourceUrl: "",
    sourceLabel: "Local demo image",
    alt: "",
    caption: "",
    date: "",
    format: "square",
  };
}

function AdminDashboard() {
  const [draft, setDraft] = useState<EventInformation>(() =>
    structuredClone(eventInfo),
  );
  const [saved, setSaved] = useState<EventInformation>(() =>
    structuredClone(eventInfo),
  );
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const [feedback, setFeedback] = useState<{
    kind: "success" | "error" | "info";
    message: string;
  } | null>(
    eventConfigurationLoadError
      ? { kind: "error", message: eventConfigurationLoadError }
      : null,
  );
  const [guestRecords, setGuestRecords] = useState<GuestRecord[]>([]);
  const [guestsLoading, setGuestsLoading] = useState(true);
  const [guestLoadError, setGuestLoadError] = useState("");
  const [wishRecords, setWishRecords] = useState<WishRecord[]>([]);
  const [wishesLoadError, setWishesLoadError] = useState("");
  const [wishesLoading, setWishesLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [previewVersion, setPreviewVersion] = useState(0);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [newGift, setNewGift] = useState<GiftSuggestion>(createGiftSuggestion);
  const [clock, setClock] = useState(Date.now());

  useEffect(() => {
    document.title = "Little Wild One – Organizer Control Center";
  }, []);

  useEffect(() => {
    const timerId = window.setInterval(() => setClock(Date.now()), 60_000);
    return () => window.clearInterval(timerId);
  }, []);

  useEffect(() => {
    let active = true;
    void localDemoGuestService
      .list()
      .then((records) => {
        if (active) {
          setGuestRecords(records);
        }
      })
      .catch((error: unknown) => {
        if (active) {
          setGuestLoadError(
            error instanceof Error
              ? error.message
              : "Guest responses could not be loaded from this browser.",
          );
        }
      })
      .finally(() => {
        if (active) {
          setGuestsLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    const loadWishes = () => {
      setWishesLoading(true);
      void localDemoWishService
        .list()
        .then((records) => {
          if (active) {
            setWishRecords(records);
            setWishesLoadError("");
          }
        })
        .catch((error: unknown) => {
          if (active) {
            setWishesLoadError(
              error instanceof Error
                ? error.message
                : "Wishes could not be loaded from this browser.",
            );
          }
        })
        .finally(() => {
          if (active) {
            setWishesLoading(false);
          }
        });
    };
    loadWishes();
    const handleStorage = (event: StorageEvent) => {
      if (event.key === wishesStorageKey) {
        loadWishes();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      active = false;
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const hasUnsavedChanges = JSON.stringify(draft) !== JSON.stringify(saved);
  const currentPageTitle =
    adminNavigation.find((item) => item.id === activeTab)?.label ?? "Overview";
  const acceptedGuests = guestRecords.filter(
    (record) => record.attendance === "accept",
  );
  const declinedGuests = guestRecords.length - acceptedGuests.length;
  const confirmedAttendees = acceptedGuests.reduce(
    (total, record) => total + record.guestCount,
    0,
  );
  const expectedResponseCount = draft.guestManagement.invitedResponseCount;
  const totalInvitations = expectedResponseCount > 0
    ? expectedResponseCount
    : guestRecords.length;
  const pendingResponseCount = expectedResponseCount > 0
    ? Math.max(expectedResponseCount - guestRecords.length, 0)
    : 0;
  const wishCounts = {
    total: wishRecords.length,
    voice: wishRecords.filter((wish) => wish.type === "voice").length,
    photo: wishRecords.filter((wish) => wish.type === "photo").length,
  };
  const confirmedMealGuests = acceptedGuests.flatMap(
    (record) => record.mealGuests ?? [],
  );
  const mealPreferences: MealPreference[] = [
    "Vegetarian",
    "Non-Vegetarian",
    "Vegan",
    "Jain",
    "Other",
  ];
  const mealPreferenceCounts: Record<MealPreference, number> = {
    Vegetarian: 0,
    "Non-Vegetarian": 0,
    Vegan: 0,
    Jain: 0,
    Other: 0,
  };
  for (const guest of confirmedMealGuests) {
    if (guest.preference) {
      mealPreferenceCounts[guest.preference] += 1;
    }
  }
  const eventTimestamp = getEventTimestamp(
    draft.celebration.dateISO,
    draft.celebration.startTime24,
    draft.celebration.timeZone,
  );
  const secondsUntilEvent =
    eventTimestamp === null ? null : Math.floor((eventTimestamp - clock) / 1000);
  const countdownLabel =
    secondsUntilEvent === null
      ? "Add the event date and time to start the countdown."
      : secondsUntilEvent < 0
        ? "The celebration date has passed."
        : secondsUntilEvent < 86400
          ? `${Math.floor(secondsUntilEvent / 3600)} hours until the celebration`
          : `${Math.floor(secondsUntilEvent / 86400)} days until the celebration`;

  const updateSection = <K extends keyof EventInformation>(
    section: K,
    patch: Partial<EventInformation[K]>,
  ) => {
    setDraft((current) => patchEventSection(current, section, patch));
  };

  const updateMilestone = (index: number, patch: Partial<Milestone>) => {
    setDraft((current) => ({
      ...current,
      milestones: current.milestones.map((milestone, milestoneIndex) =>
        milestoneIndex === index ? { ...milestone, ...patch } : milestone,
      ),
    }));
  };

  const updateGallery = (id: string, patch: Partial<GalleryMemory>) => {
    setDraft((current) => ({
      ...current,
      gallery: current.gallery.map((photo) =>
        photo.id === id ? { ...photo, ...patch } : photo,
      ),
    }));
  };

  const moveGalleryPhoto = (index: number, direction: -1 | 1) => {
    setDraft((current) => {
      const gallery = [...current.gallery].sort((a, b) => a.order - b.order);
      const target = index + direction;
      if (target < 0 || target >= gallery.length) {
        return current;
      }
      [gallery[index], gallery[target]] = [gallery[target], gallery[index]];
      return {
        ...current,
        gallery: gallery.map((photo, order) => ({ ...photo, order: order + 1 })),
      };
    });
  };

  const updateGift = (id: string, patch: Partial<GiftSuggestion>) => {
    setDraft((current) => ({
      ...current,
      gifts: {
        ...current.gifts,
        suggestions: current.gifts.suggestions.map((gift) =>
          gift.id === id ? { ...gift, ...patch } : gift,
        ),
      },
    }));
  };

  const removeGift = (gift: GiftSuggestion) => {
    if (!window.confirm(`Remove ${gift.title || "this gift"} from the invitation?`)) {
      return;
    }
    setDraft((current) => ({
      ...current,
      gifts: {
        ...current.gifts,
        suggestions: current.gifts.suggestions.filter((item) => item.id !== gift.id),
      },
    }));
    setFeedback({ kind: "success", message: "Gift removed from the draft. Save changes to update the invitation." });
  };

  const addGalleryPhoto = (src: string, caption = "") => {
    const trimmed = src.trim();
    if (!getSafeImageSource(trimmed)) {
      setFeedback({
        kind: "error",
        message: "Add a valid HTTPS image URL or a local /public asset path.",
      });
      return false;
    }
    const photo = createGalleryMemory(trimmed, draft.gallery.length + 1);
    photo.caption = caption || "A little memory";
    photo.alt = `A birthday memory of ${draft.baby.name || "our little explorer"}`;
    setDraft((current) => ({
      ...current,
      gallery: [...current.gallery, { ...photo, order: current.gallery.length + 1 }],
    }));
    setNewPhotoUrl("");
    setFeedback({ kind: "success", message: "Photo added to the draft gallery." });
    return true;
  };

  const uploadImage = async (
    file: File | undefined,
    onReady: (dataUrl: string) => boolean | void,
  ) => {
    if (!file) {
      return;
    }
    setIsUploadingImage(true);
    setFeedback({ kind: "info", message: "Preparing and compressing your image…" });
    try {
      const dataUrl = await createLocalImageDataUrl(file);
      if (onReady(dataUrl) === false) {
        return;
      }
      setFeedback({
        kind: "success",
        message: "Image added to your draft. Save the invitation to keep it in this browser.",
      });
    } catch (error) {
      setFeedback({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "This image could not be prepared. Please try another file.",
      });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const validateDraft = () => {
    if (!draft.baby.name.trim()) {
      return "Add the baby's name before saving the invitation.";
    }
    if (
      draft.celebration.dateISO &&
      !parseEventDate(draft.celebration.dateISO)
    ) {
      return "Enter a valid birthday date.";
    }
    if (
      draft.baby.birthDate &&
      draft.baby.birthDate !== "[Add birth date]" &&
      !parseEventDate(draft.baby.birthDate)
    ) {
      return "Enter a valid date of birth, or leave it blank.";
    }
    if (
      draft.celebration.startTime24 &&
      !isValidTime24(draft.celebration.startTime24)
    ) {
      return "Enter a valid event start time.";
    }
    if (
      draft.celebration.endTime24 &&
      !isValidTime24(draft.celebration.endTime24)
    ) {
      return "Enter a valid event end time.";
    }
    if (
      draft.celebration.timeZone &&
      !isValidTimeZone(draft.celebration.timeZone)
    ) {
      return "Enter a valid time zone, such as Asia/Kolkata.";
    }
    if (
      !Number.isSafeInteger(draft.guestManagement.invitedResponseCount) ||
      draft.guestManagement.invitedResponseCount < 0
    ) {
      return "Expected invitation responses must be a whole number of zero or more.";
    }
    if (
      draft.celebration.mapsUrl &&
      !getSafeHttpsUrl(draft.celebration.mapsUrl)
    ) {
      return "Use a valid HTTPS Google Maps link, or leave the directions link blank.";
    }
    if (
      draft.streaming.streamingUrl &&
      !getSafeStreamingUrlFor(
        draft.streaming.platform,
        draft.streaming.streamingUrl,
      )
    ) {
      return "Use a public HTTPS link from the selected streaming platform.";
    }
    if (
      draft.streaming.embeddedVideoUrl &&
      !getSafeEmbeddedVideoUrlFor(draft.streaming.embeddedVideoUrl)
    ) {
      return "Use a valid YouTube embed URL, or leave the embed link blank.";
    }
    if (
      draft.streaming.recordingUrl &&
      !getSafeRecordingUrlFor(draft.streaming.recordingUrl)
    ) {
      return "Use a valid HTTPS recording link, or leave it blank.";
    }
    if (
      draft.baby.heroPhotoUrl &&
      !getSafeImageSource(draft.baby.heroPhotoUrl)
    ) {
      return "Use a valid HTTPS image URL or local /public path for the profile photo.";
    }
    if (
      draft.gallery.some((photo) => !getSafeImageSource(photo.src))
    ) {
      return "One or more gallery entries have an invalid image source.";
    }
    return "";
  };

  const saveConfiguration = () => {
    const validationMessage = validateDraft();
    if (validationMessage) {
      setFeedback({ kind: "error", message: validationMessage });
      return;
    }
    const normalized: EventInformation = {
      ...draft,
      gallery: [...draft.gallery]
        .sort((a, b) => a.order - b.order)
        .map((photo, index) => ({ ...photo, order: index + 1 })),
    };
    try {
      eventConfigurationService.save(normalized);
      eventConfigurationLoadError = "";
      eventInfo = structuredClone(normalized);
      setDraft(structuredClone(normalized));
      setSaved(structuredClone(normalized));
      setFeedback({
        kind: "success",
        message: "Invitation saved in this browser. Open the public preview to see your changes.",
      });
      setPreviewVersion((version) => version + 1);
    } catch (error) {
      setFeedback({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "The invitation could not be saved.",
      });
    }
  };

  const restoreSavedConfiguration = () => {
    setDraft(structuredClone(saved));
    setFeedback({ kind: "info", message: "Your last saved configuration has been restored." });
  };

  const resetDemoData = async () => {
    if (
      !window.confirm(
        "Reset the invitation and delete all local demo RSVPs, wishes and wish media? This cannot be undone.",
      )
    ) {
      return;
    }
    try {
      await localDemoGuestService.clear();
      await localDemoWishService.clear();
      eventConfigurationService.reset();
      eventConfigurationLoadError = "";
      const defaults = structuredClone(defaultEventInfo);
      eventInfo = structuredClone(defaults);
      setDraft(structuredClone(defaults));
      setSaved(structuredClone(defaults));
      setGuestRecords([]);
      setGuestLoadError("");
      setWishRecords([]);
      setWishesLoadError("");
      setWishesLoading(false);
      setFeedback({
        kind: "success",
        message: "Demo invitation, guest responses and wishes have been reset on this browser.",
      });
      setPreviewVersion((version) => version + 1);
    } catch (error) {
      setFeedback({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "The demo data could not be reset.",
      });
    }
  };

  const addGift = () => {
    if (!newGift.title.trim()) {
      setFeedback({ kind: "error", message: "Give your gift suggestion a name first." });
      return;
    }
    setDraft((current) => ({
      ...current,
      gifts: {
        ...current.gifts,
        suggestions: [...current.gifts.suggestions, { ...newGift }],
      },
    }));
    setNewGift(createGiftSuggestion());
    setFeedback({ kind: "success", message: "Gift suggestion added to the draft." });
  };

  const renderOverview = () => {
          const responseStats = [
            { label: "Accepted", value: acceptedGuests.length, tone: "accepted" },
            { label: "Declined", value: declinedGuests, tone: "declined" },
            { label: "Pending", value: pendingResponseCount, tone: "pending" },
          ];
          const chartMaximum = Math.max(...responseStats.map((stat) => stat.value), 1);
          const recentGuests = [...guestRecords]
            .sort((first, second) => Date.parse(second.submittedAt) - Date.parse(first.submittedAt))
            .slice(0, 5);
          const sampleGuests = [
            { id: "sample-guest-family", name: "Nisha Rao", count: 3, attendance: "accept" as const },
            { id: "sample-guest-uncle", name: "Uncle Dev", count: 1, attendance: "decline" as const },
            { id: "sample-guest-friends", name: "Maya & Arjun", count: 2, attendance: "accept" as const },
          ];
          const summaryCards = [
            { label: "Total invitations", value: totalInvitations, icon: Send, tone: "sage" },
            { label: "Confirmed guests", value: confirmedAttendees, icon: Check, tone: "forest" },
            { label: "Declined invitations", value: declinedGuests, icon: X, tone: "gold" },
            { label: "Pending responses", value: expectedResponseCount > 0 ? pendingResponseCount : "—", icon: Clock3, tone: "sage" },
            { label: "Birthday wishes", value: wishCounts.total, icon: MessageCircle, tone: "gold" },
            { label: "Voice messages", value: wishCounts.voice, icon: Mic, tone: "forest" },
            { label: "Picture memories", value: wishCounts.photo, icon: Images, tone: "sage" },
          ];

          return (
            <>
              <section className="admin-overview-hero">
                <div>
                  <p className="admin-eyebrow"><Leaf size={14} /> YOUR CELEBRATION WORKSPACE</p>
                  <h2>Make room for a little more magic.</h2>
                  <p>Everything for {draft.baby.name || "your little explorer"}&apos;s celebration, gathered in one place.</p>
                </div>
                <div className="admin-overview-date">
                  <span className="admin-overview-date-icon"><CalendarDays size={19} /></span>
                  <span><small>UP NEXT</small><strong>{formatConfiguredDate(draft.celebration.dateISO) || "Set the celebration date"}</strong><em>{draft.celebration.venue || "Add a venue"}</em></span>
                </div>
              </section>
              <div className="admin-demo-notice">
                <CircleAlert size={15} /> Browser-local demo data only. It is not synchronized across devices; do not enter real guest information.
              </div>
              <div className="admin-stat-grid admin-stat-grid-seven" aria-label="Celebration overview">
                {summaryCards.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <article className={`admin-stat-card tone-${stat.tone}`} key={stat.label}>
                      <span className="admin-stat-icon"><Icon size={18} /></span>
                      <span>{stat.label}</span>
                      <strong>{stat.value}</strong>
                    </article>
                  );
                })}
              </div>
              <div className="admin-overview-grid admin-overview-grid-rich">
                <article className="admin-panel admin-rsvp-chart-panel">
                  <div className="admin-panel-heading">
                    <span className="admin-panel-icon"><UsersRound size={18} /></span>
                    <div><p className="admin-eyebrow">THE GUEST LIST</p><h3>RSVP summary</h3></div>
                  </div>
                  <p className="admin-chart-total"><strong>{guestRecords.length}</strong> responses received{expectedResponseCount > 0 ? ` of ${expectedResponseCount} invitations` : ""}</p>
                  <div className="admin-response-chart" aria-label="Guest response statistics">
                    {responseStats.map((stat) => (
                      <div className="admin-response-bar-row" key={stat.label}>
                        <span>{stat.label}</span>
                        <span className="admin-response-bar-track"><span className={`admin-response-bar is-${stat.tone}`} style={{ width: `${(stat.value / chartMaximum) * 100}%` }} /></span>
                        <strong>{stat.value}</strong>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="admin-text-link" onClick={() => setActiveTab("rsvp")}>
                    Open guest management <ChevronRight size={15} />
                  </button>
                </article>
                <article className="admin-panel admin-countdown-panel">
                  <div className="admin-panel-heading">
                    <span className="admin-panel-icon"><CalendarDays size={18} /></span>
                    <div><p className="admin-eyebrow">THE BIG DAY</p><h3>Celebration countdown</h3></div>
                  </div>
                  <p className="admin-countdown-number">{countdownLabel}</p>
                  <p className="admin-muted">{formatConfiguredDate(draft.celebration.dateISO) || "Set a birthday date"} · {draft.celebration.startTime24 || "Add a start time"}</p>
                  <button type="button" className="admin-text-link" onClick={() => setActiveTab("event")}>
                    Edit event details <ChevronRight size={15} />
                  </button>
                </article>
                <article className="admin-panel admin-recent-panel">
                  <div className="admin-panel-heading">
                    <span className="admin-panel-icon"><MessageCircle size={18} /></span>
                    <div><p className="admin-eyebrow">LATEST UPDATES</p><h3>Recent guest activity</h3></div>
                  </div>
                  {guestsLoading ? (
                    <p className="admin-empty-note" role="status">Loading browser-local guest activity…</p>
                  ) : guestLoadError ? (
                    <p className="admin-inline-error" role="alert">{guestLoadError}</p>
                  ) : recentGuests.length ? (
                    <ul className="admin-recent-list">
                      {recentGuests.map((guest) => (
                        <li key={guest.id}>
                          <span className="admin-avatar">{guest.guestName.slice(0, 1).toUpperCase()}</span>
                          <span className="admin-recent-name"><strong>{guest.guestName}</strong><small>{guest.guestCount} {guest.guestCount === 1 ? "guest" : "guests"} · {formatGuestSubmittedAt(guest.submittedAt)}</small></span>
                          <span className={`admin-response-status is-${guest.attendance}`}>{guest.attendance === "accept" ? "Accepted" : "Declined"}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="admin-sample-activity">
                      <p className="admin-sample-label">EXAMPLE RECORDS · DEMO PREVIEW ONLY · NOT SAVED</p>
                      <ul className="admin-recent-list">
                        {sampleGuests.map((guest) => (
                          <li key={guest.id}>
                            <span className="admin-avatar">{guest.name.slice(0, 1)}</span>
                            <span className="admin-recent-name"><strong>{guest.name}</strong><small>Demo record · {guest.count} {guest.count === 1 ? "guest" : "guests"}</small></span>
                            <span className={`admin-response-status is-${guest.attendance}`}>{guest.attendance === "accept" ? "Accepted" : "Declined"}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button type="button" className="admin-text-link" onClick={() => setActiveTab("rsvp")}>
                    Manage guest responses <ChevronRight size={15} />
                  </button>
                </article>
                <article className="admin-panel admin-quick-actions">
                  <div className="admin-panel-heading">
                    <span className="admin-panel-icon"><Settings size={18} /></span>
                    <div><p className="admin-eyebrow">READY WHEN YOU ARE</p><h3>Quick actions</h3></div>
                  </div>
                  <div className="admin-quick-action-list">
                    {[
                      { label: "Update baby profile", tab: "profile" as const, icon: Baby },
                      { label: "Review wishes", tab: "wishes" as const, icon: MessageCircle },
                      { label: "Check meal preferences", tab: "meals" as const, icon: Utensils },
                      { label: "Preview invitation", tab: "preview" as const, icon: Eye },
                    ].map(({ label, tab, icon: Icon }) => (
                      <button type="button" key={tab} onClick={() => setActiveTab(tab)}>
                        <Icon size={16} /><span>{label}</span><ChevronRight size={15} />
                      </button>
                    ))}
                  </div>
                </article>
              </div>
            </>
          );
        };
  const renderProfile = () => (
    <>
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <span className="admin-panel-icon"><Baby size={18} /></span>
          <div><p className="admin-eyebrow">THE STAR OF THE SHOW</p><h3>Baby profile</h3></div>
        </div>
        <div className="admin-form-grid">
          <AdminInput label="Baby's name" value={draft.baby.name} required onChange={(name) => updateSection("baby", { name })} />
          <AdminInput label="Birthday age" value={draft.baby.age} placeholder="Birthday Celebration" onChange={(age) => updateSection("baby", { age })} />
          <AdminInput label="Date of birth" type="date" value={parseEventDate(draft.baby.birthDate) ? draft.baby.birthDate : ""} onChange={(birthDate) => updateSection("baby", { birthDate })} />
          <AdminInput label="Parents' names" value={draft.baby.parentsNames} onChange={(parentsNames) => updateSection("baby", { parentsNames })} />
          <AdminTextArea label="Profile description" value={draft.baby.introduction} rows={4} onChange={(introduction) => updateSection("baby", { introduction })} />
          <AdminInput label="Profile photograph URL or /public path" value={draft.baby.heroPhotoUrl} placeholder="https://… or /images/baby.webp" onChange={(heroPhotoUrl) => updateSection("baby", { heroPhotoUrl })} />
          <label className="admin-upload-field">
            <span><Camera size={16} /> {draft.baby.heroPhotoUrl ? "Replace profile photo" : "Choose a profile photo"}</span>
            <input
              type="file"
              accept="image/*"
              disabled={isUploadingImage}
              onChange={(event) => {
                const file = event.target.files?.[0];
                void uploadImage(file, (heroPhotoUrl) =>
                  updateSection("baby", { heroPhotoUrl, heroPhotoAlt: `A photograph of ${draft.baby.name}` }),
                );
                event.target.value = "";
              }}
            />
            <small>{isUploadingImage ? "Preparing image…" : "Images are resized and stored in this browser after saving."}</small>
          </label>
          {getSafeImageSource(draft.baby.heroPhotoUrl) && (
            <div className="admin-image-preview-wrap">
              <div className="admin-image-preview admin-profile-preview">
                <img src={getSafeImageSource(draft.baby.heroPhotoUrl) ?? undefined} alt={draft.baby.heroPhotoAlt || "Baby profile preview"} />
                <span>Profile photo preview · unsaved draft</span>
              </div>
              <button
                type="button"
                className="admin-button-danger admin-image-remove"
                onClick={() => {
                  updateSection("baby", { heroPhotoUrl: "", heroPhotoAlt: "" });
                  setFeedback({ kind: "success", message: "Profile photo removed from the draft. Save to apply the change." });
                }}
              >
                <Trash2 size={15} /> Remove photo
              </button>
            </div>
          )}
          <AdminInput label="Photo description (alt text)" value={draft.baby.heroPhotoAlt} onChange={(heroPhotoAlt) => updateSection("baby", { heroPhotoAlt })} />
          <AdminTextArea label="Parents' message" value={draft.baby.parentsMessage} rows={6} onChange={(parentsMessage) => updateSection("baby", { parentsMessage })} />
        </div>
      </section>
      <section className="admin-panel admin-milestone-panel">
        <div className="admin-panel-heading">
          <span className="admin-panel-icon"><Leaf size={18} /></span>
          <div>
            <p className="admin-eyebrow">LITTLE BY LITTLE, DAY BY DAY</p>
            <h3>Baby story milestones</h3>
          </div>
        </div>
        <p className="admin-field-note">
          Edit the six story stops, their optional dates, descriptions, and jungle friends. Save changes to update the public timeline.
        </p>
        <div className="admin-milestone-list">
          {draft.milestones.map((milestone, index) => {
            const number = String(index + 1).padStart(2, "0");
            return (
              <article className="admin-milestone-card" key={`milestone-${index}`}>
                <span className="milestone-number" aria-label={`Milestone ${number}`}>{number}</span>
                <div className="admin-form-grid admin-milestone-fields">
                  <AdminInput
                    label="Milestone title"
                    value={milestone.title}
                    onChange={(title) => updateMilestone(index, { title })}
                  />
                  <AdminInput
                    label="Date or age (optional)"
                    value={milestone.date}
                    placeholder="Leave blank to hide"
                    onChange={(date) => updateMilestone(index, { date })}
                  />
                  <AdminTextArea
                    label="Milestone description"
                    value={milestone.description}
                    rows={3}
                    onChange={(description) => updateMilestone(index, { description })}
                  />
                  <label className="admin-field">
                    <span>Jungle friend</span>
                    <select
                      value={milestone.companion}
                      onChange={(event) =>
                        updateMilestone(index, {
                          companion: event.target.value as JungleAnimal,
                        })
                      }
                    >
                      <option value="elephant">Elephant</option>
                      <option value="lion">Lion</option>
                      <option value="giraffe">Giraffe</option>
                      <option value="monkey">Monkey</option>
                      <option value="zebra">Zebra</option>
                      <option value="toucan">Toucan</option>
                    </select>
                  </label>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );

  const renderEvent = () => (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <span className="admin-panel-icon"><CalendarDays size={18} /></span>
        <div><p className="admin-eyebrow">THE GATHERING</p><h3>Event details</h3></div>
      </div>
      <div className="admin-form-grid">
        <AdminInput label="Birthday date" type="date" value={draft.celebration.dateISO} onChange={(dateISO) => updateSection("celebration", { dateISO })} />
        <AdminInput label="Time zone" value={draft.celebration.timeZone} placeholder="Asia/Kolkata" hint="Use an IANA zone, for example Asia/Kolkata." onChange={(timeZone) => updateSection("celebration", { timeZone })} />
        <AdminInput label="Start time" type="time" value={draft.celebration.startTime24} onChange={(startTime24) => updateSection("celebration", { startTime24 })} />
        <AdminInput label="End time" type="time" value={draft.celebration.endTime24} onChange={(endTime24) => updateSection("celebration", { endTime24 })} />
        <AdminInput label="Venue name" value={draft.celebration.venue} onChange={(venue) => updateSection("celebration", { venue })} />
        <AdminInput label="Street address" value={draft.celebration.address} onChange={(address) => updateSection("celebration", { address })} />
        <AdminInput label="City and postal code" value={draft.celebration.cityPostal} onChange={(cityPostal) => updateSection("celebration", { cityPostal })} />
        <AdminInput label="Google Maps URL" type="url" value={draft.celebration.mapsUrl} placeholder="https://maps.google.com/…" onChange={(mapsUrl) => updateSection("celebration", { mapsUrl })} />
        <AdminInput label="Dress code" value={draft.celebration.dressCode} onChange={(dressCode) => updateSection("celebration", { dressCode })} />
        <AdminTextArea label="Event description" value={draft.content.celebrationMessage} rows={4} onChange={(celebrationMessage) => updateSection("content", { celebrationMessage })} />
      </div>
      <p className="admin-helper-banner"><MapPin size={16} /> Directions are shown on the public invitation only when a valid Maps link is saved.</p>
    </section>
  );

  const renderMealPreferences = () => {
    const preferenceEntries = mealPreferences.map((preference) => ({
      preference,
      count: mealPreferenceCounts[preference],
    }));
    const dietaryNotes = acceptedGuests.flatMap((record) =>
      (record.mealGuests ?? [])
        .filter((guest) => guest.dietaryRestrictions || guest.allergies)
        .map((guest) => ({
          guestName: guest.name || record.guestName,
          preference: guest.preference,
          restrictions: guest.dietaryRestrictions,
          allergies: guest.allergies,
        })),
    );

    return (
      <section className="admin-panel admin-meals-panel">
        <div className="admin-panel-heading">
          <span className="admin-panel-icon"><Utensils size={18} /></span>
          <div><p className="admin-eyebrow">A TABLE FOR EVERY LITTLE EXPLORER</p><h3>Meal preferences</h3></div>
        </div>
        <p className="admin-field-note">Counts include confirmed attendees with meal details in this browser.</p>
        <div className="admin-meal-stat-grid">
          {preferenceEntries.map(({ preference, count }) => (
            <article key={preference}>
              <span>{preference}</span>
              <strong>{count}</strong>
              <small>{count === 1 ? "attendee" : "attendees"}</small>
            </article>
          ))}
        </div>
        <h4 className="admin-subheading">Dietary notes and allergies</h4>
        {dietaryNotes.length ? (
          <div className="admin-meal-notes">
            {dietaryNotes.map((note, index) => (
              <article key={`${note.guestName}-${index}`}>
                <strong>{note.guestName}</strong>
                <span>{note.preference || "Meal preference not selected"}</span>
                {note.restrictions && <p>Dietary needs: {note.restrictions}</p>}
                {note.allergies && <p>Allergies: {note.allergies}</p>}
              </article>
            ))}
          </div>
        ) : (
          <p className="admin-empty-note">No dietary notes have been added to confirmed RSVPs yet.</p>
        )}
        <button type="button" className="admin-text-link" onClick={() => setActiveTab("rsvp")}>
          Edit guest meal details <ChevronRight size={15} />
        </button>
      </section>
    );
  };

  const renderGallery = () => {
    const sortedGallery = [...draft.gallery].sort((a, b) => a.order - b.order);
    return (
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <span className="admin-panel-icon"><Images size={18} /></span>
          <div><p className="admin-eyebrow">LITTLE MOMENTS, FOREVER</p><h3>Photo gallery</h3></div>
        </div>
        <div className="admin-add-photo">
          <AdminInput label="Image URL or /public path" value={newPhotoUrl} placeholder="https://… or /images/photo.webp" onChange={setNewPhotoUrl} />
          <button className="admin-button-secondary" type="button" onClick={() => addGalleryPhoto(newPhotoUrl)}>
            <Plus size={16} /> Add photo
          </button>
          <label className="admin-upload-field admin-gallery-upload">
            <span><Camera size={16} /> Upload a photo</span>
            <input
              type="file"
              accept="image/*"
              disabled={isUploadingImage}
              onChange={(event) => {
                const file = event.target.files?.[0];
                void uploadImage(file, (dataUrl) => addGalleryPhoto(dataUrl, file?.name));
                event.target.value = "";
              }}
            />
          </label>
        </div>
        <p className="admin-field-note">Uploaded images are compressed and saved locally. Keep a separate copy of your originals.</p>
        {sortedGallery.length ? (
          <div className="admin-gallery-grid">
            {sortedGallery.map((photo, index) => (
              <article className="admin-gallery-card" key={photo.id}>
                <div className="admin-gallery-thumb">
                  {getSafeImageSource(photo.src) ? (
                    <img src={getSafeImageSource(photo.src) ?? undefined} alt={photo.alt || photo.caption || "Gallery preview"} loading="lazy" />
                  ) : <span><Images size={24} /> Add a valid image source</span>}
                </div>
                <div className="admin-gallery-card-fields">
                  <AdminInput label="Caption" value={photo.caption} onChange={(caption) => updateGallery(photo.id, { caption })} />
                  <AdminInput label="Alt text" value={photo.alt} onChange={(alt) => updateGallery(photo.id, { alt })} />
                  <div className="admin-inline-fields">
                    <AdminInput label="Date" type="date" value={photo.date} onChange={(date) => updateGallery(photo.id, { date })} />
                    <label className="admin-field">
                      <span>Image shape</span>
                      <select value={photo.format} onChange={(event) => updateGallery(photo.id, { format: event.target.value as GalleryFormat })}>
                        <option value="portrait">Portrait</option>
                        <option value="landscape">Landscape</option>
                        <option value="square">Square</option>
                      </select>
                    </label>
                  </div>
                  <AdminInput label="Image URL or local path" value={photo.src} onChange={(src) => updateGallery(photo.id, { src, srcSet: "" })} />
                  <div className="admin-gallery-actions">
                    <label className="admin-gallery-replace">
                      <Camera size={14} />
                      <span>Replace photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploadingImage}
                        aria-label={`Replace ${photo.caption || "photo"}`}
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          void uploadImage(file, (dataUrl) => {
                            updateGallery(photo.id, { src: dataUrl, srcSet: "" });
                            return true;
                          });
                          event.target.value = "";
                        }}
                      />
                    </label>
                    <button className="admin-icon-button" type="button" aria-label={`Move ${photo.caption || "photo"} up`} disabled={index === 0} onClick={() => moveGalleryPhoto(index, -1)}><ArrowUp size={16} /></button>
                    <button className="admin-icon-button" type="button" aria-label={`Move ${photo.caption || "photo"} down`} disabled={index === sortedGallery.length - 1} onClick={() => moveGalleryPhoto(index, 1)}><ArrowDown size={16} /></button>
                    <span>Position {index + 1}</span>
                    <button className="admin-icon-button is-danger" type="button" aria-label={`Remove ${photo.caption || "photo"}`} onClick={() => setDraft((current) => ({ ...current, gallery: current.gallery.filter((item) => item.id !== photo.id).map((item, order) => ({ ...item, order: order + 1 })) }))}><Trash2 size={16} /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : <p className="admin-empty-note">No gallery photographs yet. Add a URL or upload a family photo above.</p>}
      </section>
    );
  };

  const renderGifts = () => (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <span className="admin-panel-icon"><Gift size={18} /></span>
        <div><p className="admin-eyebrow">A THOUGHTFUL LITTLE CORNER</p><h3>Gift suggestions</h3></div>
      </div>
      <p className="admin-field-note">Only items with a safe product link are shown to guests. Gifts are optional.</p>
      <div className="admin-gift-list">
        {draft.gifts.suggestions.map((gift) => (
          <article className="admin-gift-card" key={gift.id}>
            <div className="admin-gift-card-header">
              <label className="admin-gift-visible">
                <input type="checkbox" checked={gift.visible} onChange={(event) => updateGift(gift.id, { visible: event.target.checked })} />
                <span>{gift.visible ? "Visible to guests" : "Hidden from guests"}</span>
              </label>
              <button className="admin-icon-button is-danger" type="button" aria-label={`Remove ${gift.title || "gift"}`} onClick={() => removeGift(gift)}><Trash2 size={16} /></button>
            </div>
            <div className="admin-form-grid">
              <AdminInput label="Gift name" value={gift.title} onChange={(title) => updateGift(gift.id, { title })} />
              <label className="admin-field">
                <span>Category</span>
                <select value={gift.category} onChange={(event) => updateGift(gift.id, { category: event.target.value as GiftCategory })}>
                  {adminGiftCategories.map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
              </label>
              <AdminTextArea label="Description" value={gift.description} rows={2} onChange={(description) => updateGift(gift.id, { description })} />
              <AdminInput label="Product image URL or /public path" value={gift.imageUrl} onChange={(imageUrl) => updateGift(gift.id, { imageUrl })} />
              <label className="admin-upload-field">
                <span><Camera size={16} /> Upload or replace gift image</span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={isUploadingImage}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    void uploadImage(file, (imageUrl) => updateGift(gift.id, { imageUrl }));
                    event.target.value = "";
                  }}
                />
              </label>
              <AdminInput label="Image alt text" value={gift.imageAlt} onChange={(imageAlt) => updateGift(gift.id, { imageAlt })} />
              <AdminInput label="Shopping URL (HTTPS)" type="url" value={gift.productUrl} placeholder="https://…" onChange={(productUrl) => updateGift(gift.id, { productUrl })} />
            </div>
          </article>
        ))}
      </div>
      <div className="admin-add-gift">
        <h4>Add a gift suggestion</h4>
        <div className="admin-form-grid">
          <AdminInput label="Gift name" value={newGift.title} onChange={(title) => setNewGift((gift) => ({ ...gift, title }))} />
          <label className="admin-field">
            <span>Category</span>
            <select value={newGift.category} onChange={(event) => setNewGift((gift) => ({ ...gift, category: event.target.value as GiftCategory }))}>
              {adminGiftCategories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
          <AdminTextArea label="Description" value={newGift.description} rows={2} onChange={(description) => setNewGift((gift) => ({ ...gift, description }))} />
          <AdminInput label="Product image URL" value={newGift.imageUrl} onChange={(imageUrl) => setNewGift((gift) => ({ ...gift, imageUrl }))} />
          <label className="admin-upload-field">
            <span><Camera size={16} /> Upload gift image</span>
            <input
              type="file"
              accept="image/*"
              disabled={isUploadingImage}
              onChange={(event) => {
                const file = event.target.files?.[0];
                void uploadImage(file, (imageUrl) => setNewGift((gift) => ({ ...gift, imageUrl })));
                event.target.value = "";
              }}
            />
            <small>Images are compressed and kept in this browser.</small>
          </label>
          <AdminInput label="Image alt text" value={newGift.imageAlt} onChange={(imageAlt) => setNewGift((gift) => ({ ...gift, imageAlt }))} />
          <AdminInput label="Shopping URL" type="url" value={newGift.productUrl} onChange={(productUrl) => setNewGift((gift) => ({ ...gift, productUrl }))} />
        </div>
        <button className="admin-button-primary" type="button" onClick={addGift}><Plus size={16} /> Add suggestion</button>
      </div>
    </section>
  );

  const renderStreaming = () => (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <span className="admin-panel-icon"><Radio size={18} /></span>
        <div><p className="admin-eyebrow">FROM NEAR OR FAR</p><h3>Live celebration</h3></div>
      </div>
      <AdminToggle
        label="Show live celebration on the invitation"
        description="Guests will see the streaming details when this section is enabled."
        checked={draft.invitation.sectionVisibility.streaming}
        onChange={(visible) =>
          updateSection("invitation", {
            sectionVisibility: {
              ...draft.invitation.sectionVisibility,
              streaming: visible,
            },
          })
        }
      />
      <div className="admin-form-grid admin-top-gap">
        <label className="admin-field">
          <span>Streaming platform</span>
          <select value={draft.streaming.platform} onChange={(event) => updateSection("streaming", { platform: event.target.value as StreamingPlatform })}>
            <option>YouTube Live</option><option>Facebook Live</option><option>Zoom</option><option>Google Meet</option>
          </select>
        </label>
        <label className="admin-field">
          <span>Streaming status</span>
          <select value={draft.streaming.status} onChange={(event) => updateSection("streaming", { status: event.target.value as StreamingStatus })}>
            <option value="not-configured">Not configured</option><option value="upcoming">Upcoming</option><option value="live">Live now</option><option value="completed">Completed</option>
          </select>
        </label>
        <AdminInput label="Streaming URL" type="url" value={draft.streaming.streamingUrl} placeholder="https://…" hint="Use a public link from the selected platform: YouTube, Facebook, Zoom, or Google Meet." onChange={(streamingUrl) => updateSection("streaming", { streamingUrl })} />
        <AdminInput label="Embed URL (optional)" type="url" value={draft.streaming.embeddedVideoUrl} placeholder="https://…" hint="Only YouTube embed URLs are supported." onChange={(embeddedVideoUrl) => updateSection("streaming", { embeddedVideoUrl })} />
        <AdminInput label="Streaming date" type="date" value={draft.streaming.scheduledDateISO} onChange={(scheduledDateISO) => updateSection("streaming", { scheduledDateISO })} />
        <AdminInput label="Streaming time" type="time" value={draft.streaming.scheduledTime24} onChange={(scheduledTime24) => updateSection("streaming", { scheduledTime24 })} />
        <AdminInput label="Streaming time zone" value={draft.streaming.timeZone} placeholder="Asia/Kolkata" onChange={(timeZone) => updateSection("streaming", { timeZone })} />
        <AdminInput label="Recording URL" type="url" value={draft.streaming.recordingUrl} placeholder="https://…" hint="Use a shareable HTTPS link without private access tokens." onChange={(recordingUrl) => updateSection("streaming", { recordingUrl })} />
      </div>
    </section>
  );

  const renderSettings = () => (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <span className="admin-panel-icon"><Settings size={18} /></span>
        <div><p className="admin-eyebrow">YOUR INVITATION, YOUR WAY</p><h3>Invitation settings</h3></div>
      </div>
      <div className="admin-settings-grid">
        <AdminToggle
          label="Welcome screen"
          description="Show the animated jungle welcome when guests first visit."
          checked={draft.invitation.welcomeScreenEnabled}
          onChange={(welcomeScreenEnabled) => updateSection("invitation", { welcomeScreenEnabled })}
        />
        <AdminToggle
          label="Jungle animations"
          description="Turn off decorative motion throughout the public invitation."
          checked={draft.invitation.animationsEnabled}
          onChange={(animationsEnabled) => updateSection("invitation", { animationsEnabled })}
        />
      </div>
      <h4 className="admin-subheading">Public invitation sections</h4>
      <div className="admin-section-toggles">
        {invitationSectionLabels.map(({ key, label }) => (
          <AdminToggle
            key={key}
            label={label}
            description={draft.invitation.sectionVisibility[key] ? "Visible to guests" : "Hidden from guests"}
            checked={draft.invitation.sectionVisibility[key]}
            onChange={(visible) =>
              updateSection("invitation", {
                sectionVisibility: {
                  ...draft.invitation.sectionVisibility,
                  [key]: visible,
                },
              })
            }
          />
        ))}
      </div>
      <h4 className="admin-subheading">Contact and response planning</h4>
      <div className="admin-form-grid">
        <AdminInput label="Parents' WhatsApp number (international format)" value={draft.sharing.whatsappNumber} placeholder="+919876543210" onChange={(whatsappNumber) => updateSection("sharing", { whatsappNumber })} />
        <AdminInput label="Contact email" type="email" value={draft.sharing.contactEmail} onChange={(contactEmail) => updateSection("sharing", { contactEmail })} />
        <AdminInput label="Expected invitation responses" type="number" min="0" step="1" value={String(draft.guestManagement.invitedResponseCount)} onChange={(value) => updateSection("guestManagement", { invitedResponseCount: Number(value) || 0 })} hint="Used to estimate pending replies. Leave at 0 to show pending as unconfigured." />
      </div>
      <h4 className="admin-subheading">Website headings and messages</h4>
      <div className="admin-form-grid">
        <AdminInput label="Hero heading" value={draft.content.heroHeading} onChange={(heroHeading) => updateSection("content", { heroHeading })} />
        <AdminTextArea label="Birthday welcome message" value={draft.content.heroIntroduction} rows={2} onChange={(heroIntroduction) => updateSection("content", { heroIntroduction })} />
        <AdminInput label="Celebration heading" value={draft.content.celebrationHeading} onChange={(celebrationHeading) => updateSection("content", { celebrationHeading })} />
        <AdminTextArea label="Celebration message" value={draft.content.celebrationMessage} rows={3} onChange={(celebrationMessage) => updateSection("content", { celebrationMessage })} />
        <AdminInput label="Story heading" value={draft.content.storyHeading} onChange={(storyHeading) => updateSection("content", { storyHeading })} />
        <AdminTextArea label="Story introduction" value={draft.content.storyIntroduction} rows={2} onChange={(storyIntroduction) => updateSection("content", { storyIntroduction })} />
        <AdminInput label="Countdown heading" value={draft.content.countdownHeading} onChange={(countdownHeading) => updateSection("content", { countdownHeading })} />
        <AdminTextArea label="Countdown message" value={draft.content.countdownIntroduction} rows={2} onChange={(countdownIntroduction) => updateSection("content", { countdownIntroduction })} />
        <AdminInput label="Location heading" value={draft.content.locationHeading} onChange={(locationHeading) => updateSection("content", { locationHeading })} />
        <AdminTextArea label="Location message" value={draft.content.locationIntroduction} rows={2} onChange={(locationIntroduction) => updateSection("content", { locationIntroduction })} />
        <AdminInput label="Gallery heading" value={draft.content.galleryHeading} onChange={(galleryHeading) => updateSection("content", { galleryHeading })} />
        <AdminTextArea label="Gallery introduction" value={draft.content.galleryIntroduction} rows={2} onChange={(galleryIntroduction) => updateSection("content", { galleryIntroduction })} />
        <AdminInput label="RSVP heading" value={draft.content.rsvpHeading} onChange={(rsvpHeading) => updateSection("content", { rsvpHeading })} />
        <AdminTextArea label="RSVP message" value={draft.content.rsvpIntroduction} rows={2} onChange={(rsvpIntroduction) => updateSection("content", { rsvpIntroduction })} />
        <AdminInput label="Gift corner heading" value={draft.content.giftHeading} onChange={(giftHeading) => updateSection("content", { giftHeading })} />
        <AdminTextArea label="Gift corner message" value={draft.content.giftIntroduction} rows={2} onChange={(giftIntroduction) => updateSection("content", { giftIntroduction })} />
        <AdminInput label="Live celebration heading" value={draft.content.streamHeading} onChange={(streamHeading) => updateSection("content", { streamHeading })} />
        <AdminTextArea label="Live celebration message" value={draft.content.streamIntroduction} rows={2} onChange={(streamIntroduction) => updateSection("content", { streamIntroduction })} />
        <AdminInput label="Footer heading" value={draft.content.footerHeading} onChange={(footerHeading) => updateSection("content", { footerHeading })} />
        <AdminTextArea label="Footer introduction" value={draft.content.footerIntroduction} rows={2} onChange={(footerIntroduction) => updateSection("content", { footerIntroduction })} />
        <AdminTextArea label="Footer thank-you message" value={draft.content.footerThankYou} rows={2} onChange={(footerThankYou) => updateSection("content", { footerThankYou })} />
      </div>
    </section>
  );

  const renderPreview = () => (
    <section className="admin-panel admin-preview-panel">
      <div className="admin-panel-heading">
        <span className="admin-panel-icon"><Eye size={18} /></span>
        <div><p className="admin-eyebrow">A GUEST'S-EYE VIEW</p><h3>Invitation preview</h3></div>
      </div>
      <div className="admin-preview-toolbar">
        <p>Preview uses the last saved configuration.</p>
        <div className="admin-preview-controls" role="group" aria-label="Preview size">
          <button type="button" className={previewMode === "desktop" ? "is-selected" : ""} onClick={() => setPreviewMode("desktop")}>Desktop</button>
          <button type="button" className={previewMode === "mobile" ? "is-selected" : ""} onClick={() => setPreviewMode("mobile")}>Mobile</button>
        </div>
        <a className="admin-button-secondary" href="/" target="_blank" rel="noopener noreferrer">
          Open public site <ExternalLink size={15} />
        </a>
      </div>
      <div className={`admin-preview-frame-wrap is-${previewMode}`}>
        <iframe key={previewVersion} src="/" title="Public Little Wild One invitation preview" loading="lazy" />
      </div>
      <p className="admin-field-note">Save your changes before previewing. The invitation opens without the admin controls.</p>
    </section>
  );

  const renderActivePanel = () => {
    switch (activeTab) {
      case "overview": return renderOverview();
      case "profile": return renderProfile();
      case "event": return renderEvent();
      case "meals": return renderMealPreferences();
      case "gallery": return renderGallery();
      case "gifts": return renderGifts();
      case "streaming": return renderStreaming();
      case "rsvp":
        return (
          <div className="admin-rsvp-panel">
            <div className="admin-panel-heading">
              <span className="admin-panel-icon"><UsersRound size={18} /></span>
              <div><p className="admin-eyebrow">A PRIVATE-ISH LOCAL DEMO</p><h3>Guest responses</h3></div>
            </div>
            <p className="admin-demo-notice"><CircleAlert size={15} /> Demo only: no sign-in or access control is provided. Guest records can be viewed by anyone using this browser profile.</p>
            {guestsLoading ? (
              <p className="admin-empty-note" role="status">Loading browser-local guest responses…</p>
            ) : guestLoadError ? (
              <p className="admin-inline-error" role="alert">{guestLoadError}</p>
            ) : (
              <GuestManagementPanel
                records={guestRecords}
                onRecordsChange={setGuestRecords}
                loadError={guestLoadError}
              />
            )}
          </div>
        );
      case "wishes":
        return (
          <WishManagementPanel
            records={wishRecords}
            onRecordsChange={setWishRecords}
            loadError={wishesLoadError}
            isLoading={wishesLoading}
          />
        );
      case "settings": return renderSettings();
      case "preview": return renderPreview();
    }
  };

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar${mobileNavigationOpen ? " is-open" : ""}`} aria-label="Admin dashboard navigation">
        <a className="admin-brand" href="/admin" aria-label="Little Wild One parent dashboard">
          <span className="admin-brand-mark"><Leaf size={22} /></span>
          <span><strong>Little Wild One</strong><small>PARENT STUDIO</small></span>
        </a>
        <div className="admin-demo-chip"><span /> LOCAL DEMO</div>
        <div className="admin-organizer-profile">
          <span className="admin-organizer-avatar"><Baby size={19} /></span>
          <span><strong>{draft.baby.parentsNames || "Organizer"}</strong><small>LOCAL DEMO ORGANIZER</small></span>
        </div>
        <nav className="admin-nav" aria-label="Dashboard sections">
          <p className="admin-nav-label">ORGANIZER WORKSPACE</p>
          {adminNavigation.map(({ id, label, icon: Icon }) => (
            <button
              type="button"
              key={id}
              className={activeTab === id ? "is-active" : ""}
              aria-current={activeTab === id ? "page" : undefined}
              onClick={() => {
                setActiveTab(id);
                setMobileNavigationOpen(false);
              }}
            >
              <Icon size={17} strokeWidth={1.8} /><span>{label}</span>
              {activeTab === id && <ChevronRight size={15} />}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <span className="admin-sidebar-animal" aria-hidden="true">🐘</span>
          <p>Made for little moments<br />and the people who love them.</p>
          <a href="/">Exit demo · public invitation <ArrowLeft size={14} /></a>
        </div>
      </aside>
      {mobileNavigationOpen && (
        <button
          type="button"
          className="admin-mobile-backdrop"
          aria-label="Close dashboard navigation"
          onClick={() => setMobileNavigationOpen(false)}
        />
      )}
      <main className="admin-main">
        <header className={`admin-topbar${mobileNavigationOpen ? " navigation-open" : ""}`}>
          <button
            type="button"
            className={`admin-mobile-menu${mobileNavigationOpen ? " is-open" : ""}`}
            aria-label={mobileNavigationOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileNavigationOpen}
            onClick={() => setMobileNavigationOpen((open) => !open)}
          >
            {mobileNavigationOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <div className="admin-breadcrumb">
            <span>Parent studio</span><ChevronRight size={14} /><strong>{currentPageTitle}</strong>
          </div>
          <div className="admin-topbar-actions">
            <a className="admin-preview-shortcut" href="/" target="_blank" rel="noopener noreferrer">
              <Eye size={16} /><span>View invitation</span>
            </a>
            <button
              type="button"
              className="admin-save-button"
              onClick={saveConfiguration}
              disabled={isUploadingImage}
              aria-busy={isUploadingImage}
            >
              <Save size={16} /> {isUploadingImage ? "Preparing image…" : "Save changes"}
            </button>
          </div>
        </header>
        <div className="admin-content">
          <div className="admin-page-heading">
            <div>
              <p className="admin-date-line"><Clock3 size={14} /> A LITTLE SPACE FOR THE BIG DAY</p>
              <h1>{activeTab === "overview" ? "Little Wild One – Organizer Control Center" : currentPageTitle}</h1>
              <p>Manage your invitation details, memories and guest replies.</p>
            </div>
            <div className="admin-heading-actions">
              <button type="button" className="admin-button-secondary" disabled={!hasUnsavedChanges} onClick={restoreSavedConfiguration}>
                <RotateCcw size={15} /> Restore saved
              </button>
              <button type="button" className="admin-button-danger" onClick={() => void resetDemoData()}>
                <Trash2 size={15} /> Reset demo data
              </button>
              <a className="admin-button-secondary" href="/">
                <ArrowLeft size={15} /> Back to Website
              </a>
            </div>
          </div>
          {feedback && (
            <div className={`admin-feedback is-${feedback.kind}`} role={feedback.kind === "error" ? "alert" : "status"}>
              {feedback.kind === "success" ? <Check size={17} /> : <CircleAlert size={17} />}
              <span>{feedback.message}</span>
              <button type="button" aria-label="Dismiss message" onClick={() => setFeedback(null)}><X size={16} /></button>
            </div>
          )}
          {renderActivePanel()}
          <footer className="admin-footer-note">
            <span>🌿</span>
            <p>Local demo only. Data is saved in this browser and is not backed up, synchronized or protected by authentication.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

function App() {
  const [configurationRevision, setConfigurationRevision] = useState(0);

  useEffect(() => {
    const handleConfigurationChange = (event: StorageEvent) => {
      if (event.key !== eventConfigurationStorageKey) {
        return;
      }
      if (event.newValue === null) {
        eventInfo = structuredClone(defaultEventInfo);
      } else {
        try {
          const parsed: unknown = JSON.parse(event.newValue);
          if (!isEventInformation(parsed)) {
            throw new Error("Saved event configuration is incomplete or invalid.");
          }
          eventInfo = parsed;
        } catch (error) {
          console.warn(
            "An update from another tab contained invalid event configuration.",
            error,
          );
          return;
        }
      }
      setConfigurationRevision((revision) => revision + 1);
    };

    window.addEventListener("storage", handleConfigurationChange);
    return () => window.removeEventListener("storage", handleConfigurationChange);
  }, []);

  return window.location.pathname.replace(/\/+$/, "") === "/admin" ? (
    <AdminDashboard />
  ) : (
    <PublicInvitation key={configurationRevision} />
  );
}

function PublicInvitation() {
  const heroPhotoUrl = getSafeImageSource(eventInfo.baby.heroPhotoUrl);
  const heroPhotoFallbackUrl = getSafeImageSource(
    eventInfo.baby.heroPhotoFallbackUrl,
  );
  const [heroFallbackActive, setHeroFallbackActive] = useState(
    !heroPhotoUrl && Boolean(heroPhotoFallbackUrl),
  );
  const [heroPhotoUnavailable, setHeroPhotoUnavailable] = useState(false);
  const heroPhotoSource = heroFallbackActive
    ? heroPhotoFallbackUrl
    : heroPhotoUrl ?? heroPhotoFallbackUrl;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [welcomePhase, setWelcomePhase] = useState<"open" | "leaving" | "closed">(
    () =>
      !eventInfo.invitation.welcomeScreenEnabled || hasEnteredAdventure()
        ? "closed"
        : "open",
  );
  const [celebrationBurst, setCelebrationBurst] = useState(false);
  const [visitedSections, setVisitedSections] = useState<string[]>(() =>
    getStoredStringList("little-wild-one-explored-v1").filter((id) =>
      getVisibleAdventureStops().some((stop) => stop.id === id),
    ),
  );
  const [guestRecords, setGuestRecords] = useState<GuestRecord[]>([]);
  const [guestStorageError, setGuestStorageError] = useState("");
  const [activeAnimal, setActiveAnimal] = useState<JungleAnimal | null>(null);
  const [animalPulse, setAnimalPulse] = useState(0);
  const { soundEnabled, soundMessage, toggleSound } = useJungleAmbience();
  const enterButtonRef = useRef<HTMLButtonElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const welcomeTimerRef = useRef<number | null>(null);
  const focusHeroAfterWelcomeRef = useRef(false);
  const navigation = [
    { id: "home", label: "Home", visible: true },
    {
      id: "countdown",
      label: "Countdown",
      visible: eventInfo.invitation.sectionVisibility.countdown,
    },
    {
      id: "safari-trail",
      label: "Welcome",
      visible: eventInfo.invitation.sectionVisibility.safariTrail,
    },
    {
      id: "invitation-details",
      label: "Celebration",
      visible: eventInfo.invitation.sectionVisibility.celebration,
    },
    {
      id: "little-story",
      label: "Story",
      visible: eventInfo.invitation.sectionVisibility.story,
    },
    {
      id: "little-moments",
      label: "Gallery",
      visible: eventInfo.invitation.sectionVisibility.gallery,
    },
    {
      id: "little-gifts",
      label: "Gifts",
      visible: eventInfo.invitation.sectionVisibility.gifts,
    },
    {
      id: "celebrate-online",
      label: "Live Celebration",
      visible: eventInfo.invitation.sectionVisibility.streaming,
    },
    { id: "little-wishes", label: "Wishes", visible: true },
    {
      id: "rsvp",
      label: "RSVP",
      visible: eventInfo.invitation.sectionVisibility.rsvp,
    },
    {
      id: "destination",
      label: "Location",
      visible: eventInfo.invitation.sectionVisibility.location,
    },
  ].filter((item) => item.visible);

  useEffect(() => {
    if (!eventInfo.invitation.sectionVisibility.rsvp) {
      return;
    }

    let active = true;
    void localDemoGuestService
      .list()
      .then((records) => {
        if (active) {
          setGuestRecords(records);
        }
      })
      .catch((error: unknown) => {
        if (active) {
          setGuestStorageError(
            error instanceof Error
              ? error.message
              : "Guest records could not be loaded from local demo storage.",
          );
        }
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const age = isProvided(eventInfo.baby.age)
      ? eventInfo.baby.age
      : "Birthday Celebration";
    document.title = `${getBabyName()}'s ${age} | Little Wild One`;
    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (description) {
      description.content = formatEventCopy(eventInfo.content.metaDescription);
    }

    if (import.meta.env.DEV) {
      const warnings = getEventConfigurationWarnings();
      if (warnings.length > 0) {
        console.warn("Little Wild One event configuration needs attention:", warnings);
      }
    }
  }, []);

  useEffect(() => {
    if (welcomePhase !== "closed") {
      return;
    }

    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top - second.boundingClientRect.top,
          );
        const newlyVisited = visibleSections
          .map((entry) => entry.target.id)
          .filter((id) => getVisibleAdventureStops().some((stop) => stop.id === id));
        if (newlyVisited.length > 0) {
          setVisitedSections((current) => [
            ...current,
            ...newlyVisited.filter((id) => !current.includes(id)),
          ]);
        }
        const currentSection = visibleSections[0]?.target;
        if (currentSection instanceof HTMLElement) {
          setActiveSection(currentSection.id);
        }
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [welcomePhase]);

  useEffect(() => {
    if (
      welcomePhase !== "closed" ||
      !eventInfo.invitation.animationsEnabled ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const sections = document.querySelectorAll<HTMLElement>(
      ".page-shell > section, .page-shell > footer",
    );
    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-scroll-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-scroll-revealed");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -7% 0px", threshold: 0.02 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [welcomePhase]);

  useEffect(() => {
    try {
      sessionStorage.setItem(
        "little-wild-one-explored-v1",
        JSON.stringify(visitedSections),
      );
    } catch {
      // Exploration progress remains available for the current page view.
    }
  }, [visitedSections]);

  useEffect(() => {
    if (welcomePhase === "closed" && focusHeroAfterWelcomeRef.current) {
      focusHeroAfterWelcomeRef.current = false;
      document.getElementById("hero-title")?.focus();
    }
  }, [welcomePhase]);

  useEffect(() => {
    if (welcomePhase === "closed") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    enterButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismissWelcome(false);
      } else if (event.key === "Tab") {
        const focusable = welcomeRef.current?.querySelectorAll<HTMLElement>(
          "button:not(:disabled)",
        );
        if (!focusable?.length) {
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [welcomePhase]);

  useEffect(
    () => () => {
      if (welcomeTimerRef.current !== null) {
        window.clearTimeout(welcomeTimerRef.current);
      }
    },
    [],
  );

  const dismissWelcome = (celebrate: boolean) => {
    if (welcomePhase !== "open") {
      return;
    }
    if (welcomeTimerRef.current !== null) {
      window.clearTimeout(welcomeTimerRef.current);
    }
    setWelcomePhase("leaving");
    setCelebrationBurst(celebrate);
    focusHeroAfterWelcomeRef.current = true;
    const exitDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 650;
    welcomeTimerRef.current = window.setTimeout(() => {
      welcomeTimerRef.current = null;
      try {
        sessionStorage.setItem("little-wild-one-entered-v1", "yes");
      } catch {
        // The welcome still closes even when session storage is unavailable.
      }
      setWelcomePhase("closed");
      if (celebrate) {
        window.setTimeout(() => setCelebrationBurst(false), 1800);
      }
    }, exitDuration);
  };

  const closeMenu = () => setIsMenuOpen(false);
  const handleAnimalMessage = (animal: JungleAnimal) => {
    setActiveAnimal(animal);
    setAnimalPulse((pulse) => pulse + 1);
  };

  return (
    <>
    <main
      className={`page-shell${welcomePhase === "closed" ? " is-revealed" : ""}${eventInfo.invitation.animationsEnabled ? "" : " animations-disabled"}`}
      aria-hidden={welcomePhase !== "closed"}
      inert={welcomePhase !== "closed"}
    >
      <header className="masthead">
        <a className="wordmark" href="#home" aria-label="Little Wild One home">
          <span className="wordmark-mark" aria-hidden="true">
            <svg viewBox="0 0 36 36" fill="none">
              <path d="M18 29V11m0 9C10 20 7 15 8 9c6 0 10 3 10 11Zm0-4c0-6 4-10 10-10 1 6-2 10-10 11Z" />
            </svg>
          </span>
          <span className="wordmark-type">
            <span>Little Wild One</span>
            <span className="wordmark-caption">
              {getBabyName()} · {isProvided(eventInfo.baby.age) ? eventInfo.baby.age : "Birthday celebration"}
            </span>
          </span>
        </a>
        <button
          className={`navigation-toggle${isMenuOpen ? " is-open" : ""}`}
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
        </button>
        <nav
          className={`site-navigation${isMenuOpen ? " is-open" : ""}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <a
              className={activeSection === item.id ? "is-active" : undefined}
              href={`#${item.id}`}
              key={item.id}
              aria-current={activeSection === item.id ? "location" : undefined}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <span className="edition-mark">FICTIONAL DEMO INVITATION</span>
      </header>

      <section
        className="invitation-hero"
        id="home"
        aria-labelledby="hero-title"
        tabIndex={-1}
      >
        <div className="hero-atmosphere" aria-hidden="true">
          <span className="hero-canopy-leaf hero-canopy-leaf-left" />
          <span className="hero-canopy-leaf hero-canopy-leaf-right" />
          <span className="hero-firefly hero-firefly-one" />
          <span className="hero-firefly hero-firefly-two" />
          <span className="hero-firefly hero-firefly-three" />
          <span className="hero-firefly hero-firefly-four" />
          <svg className="hero-birds" viewBox="0 0 92 34" fill="none">
            <path d="M3 16c6-7 11-7 16 0 5-7 10-7 16 0M48 8c5-6 10-6 15 0 5-6 10-6 15 0" />
          </svg>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-rule" aria-hidden="true" />
            {formatEventCopy(eventInfo.content.heroEyebrow)}
          </p>
          <h1 id="hero-title" tabIndex={-1}>
            {formatEventCopy(eventInfo.content.heroHeading)}
          </h1>
          <p className="hero-occasion">
            {getBabyName()} · {isProvided(eventInfo.baby.age) ? eventInfo.baby.age : "Birthday celebration"}{" "}
            <em>in the wild</em>
          </p>
          <p className="hero-message">
            {formatEventCopy(eventInfo.content.heroIntroduction)}
          </p>
          <div className="hero-actions">
            <a className="explore-link" href="#invitation-details">
              <span>Explore the Celebration</span>
              <span className="explore-icon">
                <ArrowIcon />
              </span>
            </a>
            <a
              className="hero-calendar-link"
              href={buildCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Save the Date <CalendarIcon />
            </a>
          </div>
        </div>

        <div className="hero-art">
          <span className="art-note art-note-top" aria-hidden="true">
            THE LITTLE SAVANNA
          </span>
          {heroPhotoSource && !heroPhotoUnavailable ? (
            <img
              className="hero-photo"
              src={heroPhotoSource}
              alt={
                isProvided(eventInfo.baby.heroPhotoAlt)
                  ? formatEventCopy(eventInfo.baby.heroPhotoAlt)
                  : `A photograph of ${getBabyName()}`
              }
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="(max-width: 860px) 90vw, 48vw"
              onError={() => {
                if (
                  !heroFallbackActive &&
                  heroPhotoFallbackUrl &&
                  heroPhotoSource !== heroPhotoFallbackUrl
                ) {
                  setHeroFallbackActive(true);
                  return;
                }
                setHeroPhotoUnavailable(true);
              }}
            />
          ) : (
            <SafariLandscape />
          )}
          <span className="floating-leaf floating-leaf-one" aria-hidden="true">
            <svg viewBox="0 0 48 72" fill="none">
              <path d="M24 68C20 43 23 22 38 4 43 25 39 48 24 68Z" />
              <path d="M23 67 34 27" />
            </svg>
          </span>
          <span className="floating-leaf floating-leaf-two" aria-hidden="true">
            <svg viewBox="0 0 48 72" fill="none">
              <path d="M24 68C20 43 23 22 38 4 43 25 39 48 24 68Z" />
              <path d="M23 67 34 27" />
            </svg>
          </span>
          <span className="art-note art-note-bottom" role="status" aria-live="polite">
            {activeAnimal
              ? jungleAnimalMessages[activeAnimal]
              : "A curious heart · a world of wonder"}
          </span>
          <div className="hero-animal-hello" aria-label="Meet the jungle friends">
            {([
              ["elephant", "Elephant"],
              ["giraffe", "Giraffe"],
              ["lion", "Lion"],
            ] as const).map(([animal, label]) => (
              <button
                className={`hero-animal-button${activeAnimal === animal ? ` is-active is-pulse-${animalPulse % 2 === 0 ? "even" : "odd"}` : ""}`}
                type="button"
                key={animal}
                aria-label={`Say hello to the ${label}`}
                aria-pressed={activeAnimal === animal}
                onClick={() => handleAnimalMessage(animal)}
              >
                <span aria-hidden="true">
                  <SafariCompanion animal={animal} />
                </span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="hero-details">
          <span className="detail-label">Save the day</span>
          <span className="detail-date">{getBirthdayDisplayDate()}</span>
          <span className="detail-age">A little celebration, made with love</span>
        </div>
      </section>

      {eventInfo.invitation.sectionVisibility.countdown && <BirthdayCountdown />}
      {eventInfo.invitation.sectionVisibility.safariTrail && <SafariAdventure
        visitedSections={visitedSections}
        activeSection={activeSection}
        activeAnimal={activeAnimal}
        animalPulse={animalPulse}
        onAnimalMessage={handleAnimalMessage}
        soundEnabled={soundEnabled}
        soundMessage={soundMessage}
        onToggleSound={() => void toggleSound()}
      />}
      {eventInfo.invitation.sectionVisibility.celebration && <CelebrationDetails />}
      {eventInfo.invitation.sectionVisibility.story && <BabysStory />}
      {eventInfo.invitation.sectionVisibility.gallery && <BabyPhotoGallery />}
      {eventInfo.invitation.sectionVisibility.gifts && <GiftCorner />}
      {!eventInfo.invitation.sectionVisibility.gifts &&
        eventInfo.invitation.sectionVisibility.surprise && <BirthdaySurprise />}
      {eventInfo.invitation.sectionVisibility.streaming && <CelebrationStream />}
      <WishesWall />
      {eventInfo.invitation.sectionVisibility.rsvp && (
        <RsvpSection
          guestRecords={guestRecords}
          setGuestRecords={setGuestRecords}
          setStorageError={setGuestStorageError}
        />
      )}
      {eventInfo.invitation.sectionVisibility.location && <SafariDestination />}
      {eventInfo.invitation.sectionVisibility.footer && (
        <GrandFinale />
      )}
      <section className="organizer-corner" aria-labelledby="organizer-corner-title">
        <div className="organizer-corner-copy">
          <p className="organizer-corner-kicker">A little note for the grown-ups</p>
          <h2 id="organizer-corner-title">Organizer&apos;s Corner</h2>
          <p>
            Planning a little adventure? Manage your celebration details, guest
            responses and special memories in this browser-local demo dashboard.
          </p>
        </div>
        <a className="organizer-corner-button" href="/admin">
          Open Parent Dashboard <span aria-hidden="true">→</span>
        </a>
        <p className="organizer-corner-notice">
          Local demo only. The dashboard has no authentication and is not secure
          for private guest data.
        </p>
      </section>
    </main>
    {welcomePhase !== "closed" && (
      <WelcomeOverlay
        babyName={getBabyName()}
        leaving={welcomePhase === "leaving"}
        enterButtonRef={enterButtonRef}
        overlayRef={welcomeRef}
        onEnter={() => dismissWelcome(true)}
        onSkip={() => dismissWelcome(false)}
      />
    )}
    {celebrationBurst && <ConfettiBurst />}
    </>
  );
}

export default App;
