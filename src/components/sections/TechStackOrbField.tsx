"use client";

import { useEffect, useMemo, useRef } from "react";

type Orb = {
  id: number;
  label: string;
  logo: string;
  logoPath?: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  r: number;
  hue: number;
  saturation: number;
  lightness: number;
  textColor: string;
  spin: number;
  spinVelocity: number;
  wobblePhase: number;
  wobbleStrength: number;
};

type TechStackOrbFieldProps = {
  labels: string[];
};

const MIN_RADIUS = 38;
const MAX_RADIUS = 66;
const MIN_RENDER_RADIUS = 24;
const TARGET_COUNT = 30;
const MIN_COUNT = 24;
const DEPTH_NEAR = -90;
const DEPTH_FAR = 140;
const DEPTH_CENTER = 0;
const FOCAL_LENGTH = 520;
const POINTER_PUSH_RADIUS = 132;
const POINTER_PUSH_FORCE = 1020;
const POINTER_SWIRL_FORCE = 760;
const POINTER_SPLIT_Z_FORCE = 280;
const MAX_SPEED_XY = 250;
const MAX_SPEED_Z = 120;
const COHESION_FORCE = 20;
const ORBIT_FORCE = 34;
const SEPARATION_FORCE = 0.09;
const AXIS_ROTATE_X_FORCE = 42;
const AXIS_ROTATE_Y_FORCE = 56;
const NINE_D_MOTION_FORCE = 26;
const FULL_DRIFT_FORCE = 36;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildRandomizedLabelPool(labels: string[]) {
  const base = Array.from(new Set(labels)).filter(Boolean);
  if (base.length === 0) {
    return ["Tech"];
  }

  const minDesired = Math.max(MIN_COUNT, base.length);
  const maxDesired = Math.max(minDesired, TARGET_COUNT);
  const desiredCount = randomInt(minDesired, maxDesired);

  // Keep at least one orb for every technology, then add random extras.
  const pool = [...base];
  while (pool.length < desiredCount) {
    pool.push(base[randomInt(0, base.length - 1)]);
  }

  return shuffle(pool);
}

function hashLabel(label: string) {
  let hash = 0;
  for (let i = 0; i < label.length; i += 1) {
    hash = (hash * 31 + label.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function getLabelFamilyHue(label: string) {
  const normalized = label.toLowerCase();

  if (/(python|langchain|rag|openai|prompt|vector|ai|ml)/.test(normalized)) {
    return 208;
  }
  if (/(react|next|typescript|node|fastapi|tailwind|css|javascript|js|html)/.test(normalized)) {
    return 188;
  }
  if (/(docker|github|git|postman|vercel|cloud|kubernetes|aws|azure|gcp)/.test(normalized)) {
    return 158;
  }

  return 172;
}

type OrbPalette = {
  logo: string;
  logoPath?: string;
  hue: number;
  saturation: number;
  lightness: number;
  textColor: string;
};

function getLabelColor(label: string) {
  const normalized = label.toLowerCase();
  const hash = hashLabel(label);

  if (/java/.test(normalized)) {
    return {
      logo: "Jv",
      logoPath: "/tech-logos/java.svg",
      hue: 193,
      saturation: 76,
      lightness: 37,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/python/.test(normalized)) {
    return {
      logo: "Py",
      logoPath: "/tech-logos/python.svg",
      hue: 214,
      saturation: 66,
      lightness: 43,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/html/.test(normalized)) {
    return {
      logo: "H5",
      logoPath: "/tech-logos/html5.svg",
      hue: 17,
      saturation: 88,
      lightness: 46,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/css/.test(normalized)) {
    return {
      logo: "CS",
      logoPath: "/tech-logos/css3.svg",
      hue: 210,
      saturation: 78,
      lightness: 44,
      textColor: "#0f172a",
    } satisfies OrbPalette;
  }

  if (/typescript/.test(normalized)) {
    return {
      logo: "TS",
      logoPath: "/tech-logos/typescript.svg",
      hue: 211,
      saturation: 82,
      lightness: 44,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/react|next/.test(normalized)) {
    const isNext = /next/.test(normalized);
    return {
      logo: isNext ? "Nx" : "Re",
      logoPath: isNext ? "/tech-logos/nextjs.svg" : "/tech-logos/react.svg",
      hue: isNext ? 222 : 191,
      saturation: isNext ? 26 : 70,
      lightness: isNext ? 20 : 45,
      textColor: "#f9fafb",
    } satisfies OrbPalette;
  }

  if (/node/.test(normalized)) {
    return {
      logo: "Nd",
      logoPath: "/tech-logos/nodejs.svg",
      hue: 108,
      saturation: 56,
      lightness: 40,
      textColor: "#0f172a",
    } satisfies OrbPalette;
  }

  if (/spring\s?boot/.test(normalized)) {
    return {
      logo: "SB",
      logoPath: "/tech-logos/springboot.svg",
      hue: 138,
      saturation: 54,
      lightness: 42,
      textColor: "#0f172a",
    } satisfies OrbPalette;
  }

  if (/express/.test(normalized)) {
    return {
      logo: "Ex",
      logoPath: "/tech-logos/express.svg",
      hue: 210,
      saturation: 20,
      lightness: 32,
      textColor: "#0f172a",
    } satisfies OrbPalette;
  }

  if (/rest\s?apis?|restapi/.test(normalized)) {
    return {
      logo: "RA",
      logoPath: "/tech-logos/restapi.svg",
      hue: 198,
      saturation: 62,
      lightness: 42,
      textColor: "#0f172a",
    } satisfies OrbPalette;
  }

  if (/postgres|postgresql/.test(normalized)) {
    return {
      logo: "Pg",
      logoPath: "/tech-logos/postgresql.svg",
      hue: 208,
      saturation: 52,
      lightness: 42,
      textColor: "#0f172a",
    } satisfies OrbPalette;
  }

  if (/mongodb|mongo\s?db/.test(normalized)) {
    return {
      logo: "Mg",
      logoPath: "/tech-logos/mongodb.svg",
      hue: 128,
      saturation: 46,
      lightness: 40,
      textColor: "#0f172a",
    } satisfies OrbPalette;
  }

  if (/redis/.test(normalized)) {
    return {
      logo: "Rd",
      logoPath: "/tech-logos/redis.svg",
      hue: 10,
      saturation: 70,
      lightness: 44,
      textColor: "#0f172a",
    } satisfies OrbPalette;
  }

  if (/^sql$/.test(normalized)) {
    return {
      logo: "SQL",
      logoPath: "/tech-logos/sql.svg",
      hue: 212,
      saturation: 54,
      lightness: 38,
      textColor: "#0f172a",
    } satisfies OrbPalette;
  }

  if (/database\s?design/.test(normalized)) {
    return {
      logo: "DB",
      logoPath: "/tech-logos/database.svg",
      hue: 194,
      saturation: 44,
      lightness: 40,
      textColor: "#0f172a",
    } satisfies OrbPalette;
  }

  if (/aws|amazon\s?web\s?services/.test(normalized)) {
    return {
      logo: "AW",
      logoPath: "/tech-logos/aws.svg",
      hue: 39,
      saturation: 90,
      lightness: 45,
      textColor: "#0f172a",
    } satisfies OrbPalette;
  }

  if (/ci\s*\/?\s*cd|cicd/.test(normalized)) {
    return {
      logo: "CI",
      logoPath: "/tech-logos/cicd.svg",
      hue: 232,
      saturation: 52,
      lightness: 42,
      textColor: "#0f172a",
    } satisfies OrbPalette;
  }

  if (/javascript|^js$/.test(normalized)) {
    return {
      logo: "JS",
      logoPath: "/tech-logos/javascript.svg",
      hue: 52,
      saturation: 92,
      lightness: 52,
      textColor: "#111827",
    } satisfies OrbPalette;
  }

  if (/docker/.test(normalized)) {
    return {
      logo: "Dk",
      logoPath: "/tech-logos/docker.svg",
      hue: 206,
      saturation: 90,
      lightness: 44,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/github/.test(normalized)) {
    return {
      logo: "GH",
      logoPath: "/tech-logos/github.svg",
      hue: 221,
      saturation: 32,
      lightness: 22,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/tailwind/.test(normalized)) {
    return {
      logo: "Tw",
      logoPath: "/tech-logos/tailwindcss.svg",
      hue: 191,
      saturation: 82,
      lightness: 46,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/postman/.test(normalized)) {
    return {
      logo: "Pm",
      logoPath: "/tech-logos/postman.svg",
      hue: 20,
      saturation: 90,
      lightness: 50,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/vercel/.test(normalized)) {
    return {
      logo: "Vc",
      logoPath: "/tech-logos/vercel.svg",
      hue: 0,
      saturation: 0,
      lightness: 18,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/fastapi/.test(normalized)) {
    return {
      logo: "FA",
      logoPath: "/tech-logos/fastapi.svg",
      hue: 157,
      saturation: 66,
      lightness: 40,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/langchain/.test(normalized)) {
    return {
      logo: "LC",
      logoPath: "/tech-logos/langchain.svg",
      hue: 145,
      saturation: 56,
      lightness: 32,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/openai/.test(normalized)) {
    return {
      logo: "AI",
      logoPath: "/tech-logos/openai.svg",
      hue: 160,
      saturation: 34,
      lightness: 18,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/rag/.test(normalized)) {
    return {
      logo: "RG",
      logoPath: "/tech-logos/rag.svg",
      hue: 268,
      saturation: 62,
      lightness: 40,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/vector|database|db/.test(normalized)) {
    return {
      logo: "DB",
      logoPath: "/tech-logos/vectordb.svg",
      hue: 196,
      saturation: 52,
      lightness: 34,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/prompt/.test(normalized)) {
    return {
      logo: "Pr",
      logoPath: "/tech-logos/prompt.svg",
      hue: 292,
      saturation: 58,
      lightness: 40,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/git\b/.test(normalized)) {
    return {
      logo: "Gt",
      logoPath: "/tech-logos/git.svg",
      hue: 17,
      saturation: 82,
      lightness: 44,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/vs\s?code|vscode/.test(normalized)) {
    return {
      logo: "VS",
      logoPath: "/tech-logos/vscode.svg",
      hue: 206,
      saturation: 86,
      lightness: 42,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/go\b/.test(normalized)) {
    return {
      logo: "Go",
      logoPath: "/tech-logos/go.svg",
      hue: 191,
      saturation: 74,
      lightness: 44,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/rust/.test(normalized)) {
    return {
      logo: "Rs",
      logoPath: "/tech-logos/rust.svg",
      hue: 21,
      saturation: 42,
      lightness: 24,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/c\+\+/.test(normalized)) {
    return {
      logo: "C+",
      logoPath: "/tech-logos/cpp.svg",
      hue: 220,
      saturation: 52,
      lightness: 42,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  if (/api/.test(normalized)) {
    return {
      logo: "AP",
      hue: 200,
      saturation: 62,
      lightness: 36,
      textColor: "#f8fafc",
    } satisfies OrbPalette;
  }

  const familyHue = getLabelFamilyHue(label);
  const hue = (familyHue + (hash % 40) - 20 + 360) % 360;

  return {
    logo: label.replace(/[^a-zA-Z0-9]/g, "").slice(0, 2).padEnd(2, "T"),
    hue,
    saturation: 42 + (hash % 20),
    lightness: 34 + (hash % 14),
    textColor: "#f8fafc",
  };
}

function projectOrb(orb: Orb, width: number, height: number) {
  const cx = width / 2;
  const cy = height / 2;
  const scale = FOCAL_LENGTH / (FOCAL_LENGTH + orb.z);

  return {
    x: (orb.x - cx) * scale + cx,
    y: (orb.y - cy) * scale + cy,
    r: orb.r * scale,
    scale,
  };
}

function buildOrbs(labels: string[], width: number, height: number): Orb[] {
  const techPool = labels.length > 0 ? labels : ["Tech"];
  const count = clamp(techPool.length, MIN_COUNT, TARGET_COUNT);
  const spreadX = width * 0.32;
  const spreadY = height * 0.28;

  return Array.from({ length: count }, (_, index) => {
    const r = randomBetween(MIN_RADIUS, MAX_RADIUS);
    const cx = width / 2;
    const cy = height / 2;
    const x = cx + randomBetween(-spreadX, spreadX) * (0.45 + Math.random() * 0.55);
    const y = cy + randomBetween(-spreadY, spreadY) * (0.42 + Math.random() * 0.58);
    const z = randomBetween(-22, 22);
    const dx = cx - x;
    const dy = cy - y;
    const dz = DEPTH_CENTER - z;
    const len = Math.hypot(dx, dy, dz) || 1;
    const swirlDirection = index % 2 === 0 ? 1 : -1;
    const color = getLabelColor(techPool[index % techPool.length]);

    return {
      id: index,
      label: techPool[index % techPool.length],
      logo: color.logo,
      logoPath: color.logoPath,
      x,
      y,
      z,
      vx: (dx / len) * randomBetween(10, 28) + randomBetween(-10, 10),
      vy: (dy / len) * randomBetween(10, 28) + randomBetween(-10, 10),
      vz: (dz / (Math.abs(dz) || 1)) * randomBetween(5, 18) + swirlDirection * randomBetween(2, 8),
      r,
      hue: color.hue,
      saturation: color.saturation,
      lightness: color.lightness,
      textColor: color.textColor,
      spin: randomBetween(0, Math.PI * 2),
      spinVelocity: randomBetween(-1.25, 1.25),
      wobblePhase: randomBetween(0, Math.PI * 2),
      wobbleStrength: randomBetween(0.45, 1),
    };
  });
}

function buildLabelLines(context: CanvasRenderingContext2D, label: string, maxWidth: number) {
  const words = label.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 1) {
    return [label];
  }

  const lines: string[] = [];
  let current = words[0];

  for (let i = 1; i < words.length; i += 1) {
    const next = `${current} ${words[i]}`;
    if (context.measureText(next).width <= maxWidth || lines.length >= 1) {
      current = next;
    } else {
      lines.push(current);
      current = words[i];
    }
  }

  lines.push(current);
  return lines.slice(0, 2);
}

export default function TechStackOrbField({ labels }: TechStackOrbFieldProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const logoImagesRef = useRef<Map<string, HTMLImageElement>>(new Map());

  const randomizedLabelPool = useMemo(() => buildRandomizedLabelPool(labels), [labels]);

  useEffect(() => {
    const host = wrapRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let raf = 0;
    let previous = performance.now();
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    let width = Math.max(320, Math.floor(host.clientWidth || host.getBoundingClientRect().width));
    let height = Math.max(320, Math.floor(host.clientHeight || host.getBoundingClientRect().height));
    let world = buildOrbs(randomizedLabelPool, width, height);

    const logoPaths = Array.from(new Set(world.map((orb) => orb.logoPath).filter((path): path is string => Boolean(path))));
    for (let i = 0; i < logoPaths.length; i += 1) {
      const path = logoPaths[i];
      if (!logoImagesRef.current.has(path)) {
        const img = new Image();
        img.src = path;
        logoImagesRef.current.set(path, img);
      }
    }

    const resizeCanvas = () => {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    const onResize = () => {
      width = Math.max(320, Math.floor(host.clientWidth || width));
      height = Math.max(320, Math.floor(host.clientHeight || height));
      world = buildOrbs(randomizedLabelPool, width, height);
      const resizedLogoPaths = Array.from(new Set(world.map((orb) => orb.logoPath).filter((path): path is string => Boolean(path))));
      for (let i = 0; i < resizedLogoPaths.length; i += 1) {
        const path = resizedLogoPaths[i];
        if (!logoImagesRef.current.has(path)) {
          const img = new Image();
          img.src = path;
          logoImagesRef.current.set(path, img);
        }
      }
      resizeCanvas();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const sortedOrbs = [...world].sort((a, b) => b.z - a.z);

      for (let i = 0; i < sortedOrbs.length; i += 1) {
        const orb = sortedOrbs[i];
        const projected = projectOrb(orb, width, height);
        const renderR = Math.max(MIN_RENDER_RADIUS, projected.r);

        const depthFactor = clamp((orb.z - DEPTH_NEAR) / (DEPTH_FAR - DEPTH_NEAR), 0, 1);
        const toneShift = Math.round((0.5 - depthFactor) * 8);
        const centerFill = `hsl(0, 0%, ${clamp(98 + toneShift * 0.5, 94, 100)}%)`;
        const baseFill = `hsl(0, 0%, ${clamp(94 + toneShift * 0.45, 88, 98)}%)`;
        const edgeFill = `hsl(210, 12%, ${clamp(84 + toneShift * 0.35, 76, 90)}%)`;
        const strokeFill = `hsla(210, 16%, ${clamp(70 + toneShift * 0.25, 62, 78)}%, 0.9)`;

        const sphereGradient = context.createRadialGradient(
          projected.x - renderR * 0.22,
          projected.y - renderR * 0.24,
          renderR * 0.16,
          projected.x,
          projected.y,
          renderR
        );
        sphereGradient.addColorStop(0, centerFill);
        sphereGradient.addColorStop(0.58, baseFill);
        sphereGradient.addColorStop(1, edgeFill);

        context.beginPath();
        context.arc(projected.x, projected.y, renderR, 0, Math.PI * 2);
        context.fillStyle = sphereGradient;
        context.fill();

        context.beginPath();
        context.arc(projected.x, projected.y, renderR, 0, Math.PI * 2);
        context.strokeStyle = strokeFill;
        context.lineWidth = Math.max(1.1, renderR * 0.06);
        context.stroke();

        const logoR = Math.max(16, renderR * 0.72);
        const logoY = projected.y;
        const logoImage = orb.logoPath ? logoImagesRef.current.get(orb.logoPath) : undefined;

        context.textAlign = "center";
        context.textBaseline = "middle";

        if (logoImage && logoImage.complete && logoImage.naturalWidth > 0) {
          const logoSize = logoR * 1.36;
          context.save();
          context.beginPath();
          context.arc(projected.x, projected.y, renderR * 0.94, 0, Math.PI * 2);
          context.clip();
          context.drawImage(logoImage, projected.x - logoSize / 2, logoY - logoSize / 2, logoSize, logoSize);
          context.restore();
        } else {
          context.fillStyle = "#0b1220";
          context.font = `700 ${Math.max(12, renderR * 0.32)}px var(--font-space), sans-serif`;
          context.fillText(orb.logo, projected.x, logoY, logoR * 1.6);
        }

        const labelFontSize = Math.max(13.2, renderR * 0.22);
        context.font = `800 ${labelFontSize}px var(--font-space), sans-serif`;

        const labelMaxWidth = renderR * 1.72;
        const labelLines = buildLabelLines(context, orb.label, labelMaxWidth);
        const lineHeight = labelFontSize * 1.05;
        const labelBaseY = projected.y + renderR * 0.64 - ((labelLines.length - 1) * lineHeight) / 2;

        context.fillStyle = "#0f172a";
        for (let lineIndex = 0; lineIndex < labelLines.length; lineIndex += 1) {
          const line = labelLines[lineIndex];
          const lineY = labelBaseY + lineIndex * lineHeight;
          context.fillText(line, projected.x, lineY, labelMaxWidth);
        }
      }
    };

    const tick = (now: number) => {
      const delta = clamp((now - previous) / 1000, 0.008, 0.03);
      previous = now;

      for (let i = 0; i < world.length; i += 1) {
        const orb = world[i];
        const cx = width / 2;
        const cy = height / 2;
        const centerDx = cx - orb.x;
        const centerDy = cy - orb.y;
        const centerDz = DEPTH_CENTER - orb.z;
        const radialDistance = Math.hypot(centerDx, centerDy) || 1;
        const tangentialX = (-centerDy / radialDistance) * ORBIT_FORCE;
        const tangentialY = (centerDx / radialDistance) * ORBIT_FORCE;
        const swirlDirection = orb.id % 2 === 0 ? 1 : -1;

        orb.vx += centerDx * COHESION_FORCE * delta * 0.001;
        orb.vy += centerDy * COHESION_FORCE * delta * 0.001;
        orb.vz += centerDz * COHESION_FORCE * delta * 0.0007;
        orb.vx += tangentialX * delta * 0.65 * swirlDirection;
        orb.vy += tangentialY * delta * 0.65 * swirlDirection;
        orb.vz += Math.sin((now + orb.id * 137) * 0.0014) * 3.5 * delta;

        const relX = orb.x - cx;
        const relY = orb.y - cy;
        const relZ = orb.z - DEPTH_CENTER;
        const widthNorm = Math.max(120, width * 0.5);
        const heightNorm = Math.max(120, height * 0.5);

        orb.vx += (-relZ / FOCAL_LENGTH) * AXIS_ROTATE_Y_FORCE * delta;
        orb.vz += (relX / widthNorm) * AXIS_ROTATE_Y_FORCE * delta;
        orb.vy += (relZ / FOCAL_LENGTH) * AXIS_ROTATE_X_FORCE * delta;
        orb.vz += (-relY / heightNorm) * AXIS_ROTATE_X_FORCE * delta;

        // 9D-inspired collapsed motion: nine periodic dimensions projected to x/y/z.
        const t = now * 0.001 + orb.id * 0.173;
        const d1 = Math.sin(t * 0.77);
        const d2 = Math.cos(t * 0.93);
        const d3 = Math.sin(t * 1.11 + relX * 0.006);
        const d4 = Math.cos(t * 1.27 + relY * 0.007);
        const d5 = Math.sin(t * 1.41 + relZ * 0.01);
        const d6 = Math.cos(t * 1.61 + (relX + relY) * 0.004);
        const d7 = Math.sin(t * 1.83 + (relY - relZ) * 0.005);
        const d8 = Math.cos(t * 2.03 + (relZ + relX) * 0.005);
        const d9 = Math.sin(t * 2.23 + (relX - relY) * 0.004);

        const nineDX = (d1 + d4 + d7) * NINE_D_MOTION_FORCE;
        const nineDY = (d2 + d5 + d8) * NINE_D_MOTION_FORCE;
        const nineDZ = (d3 + d6 + d9) * NINE_D_MOTION_FORCE;

        orb.vx += nineDX * delta * 0.12;
        orb.vy += nineDY * delta * 0.12;
        orb.vz += nineDZ * delta * 0.08;

        const driftT = now * 0.0012 + orb.wobblePhase;
        orb.vx += Math.sin(driftT * 0.89 + orb.id * 0.13) * FULL_DRIFT_FORCE * orb.wobbleStrength * delta;
        orb.vy += Math.cos(driftT * 1.03 + orb.id * 0.17) * FULL_DRIFT_FORCE * orb.wobbleStrength * delta;
        orb.vz += Math.sin(driftT * 1.21 + orb.id * 0.11) * (FULL_DRIFT_FORCE * 0.62) * orb.wobbleStrength * delta;

        orb.spin += orb.spinVelocity * delta;
        orb.spinVelocity += Math.sin(driftT * 0.73 + orb.id * 0.23) * 0.12 * delta;
        orb.spinVelocity = clamp(orb.spinVelocity, -2.2, 2.2);

        orb.x += orb.vx * delta;
        orb.y += orb.vy * delta;
        orb.z += orb.vz * delta;

        const speed = Math.hypot(orb.vx, orb.vy);
        if (speed > MAX_SPEED_XY) {
          const s = MAX_SPEED_XY / speed;
          orb.vx *= s;
          orb.vy *= s;
        }

        orb.vz = clamp(orb.vz, -MAX_SPEED_Z, MAX_SPEED_Z);

        if (pointerRef.current.active) {
          const projected = projectOrb(orb, width, height);
          const px = pointerRef.current.x;
          const py = pointerRef.current.y;
          const dx = projected.x - px;
          const dy = projected.y - py;
          const d = Math.hypot(dx, dy) || 1;

          if (d < projected.r + POINTER_PUSH_RADIUS * 1.2) {
            const reach = projected.r + POINTER_PUSH_RADIUS * 1.2;
            const influence = 1 - d / reach;
            const worldPush = (POINTER_PUSH_FORCE * influence * delta) / projected.scale;
            const swirl = POINTER_SWIRL_FORCE * influence * delta;

            orb.vx += (dx / d) * worldPush;
            orb.vy += (dy / d) * worldPush;
            orb.vx += (-dy / d) * swirl;
            orb.vy += (dx / d) * swirl;
            orb.vz += (orb.z > DEPTH_CENTER ? 1 : -1) * worldPush * 0.16;
            orb.vz += (orb.id % 2 === 0 ? 1 : -1) * POINTER_SPLIT_Z_FORCE * influence * delta;
          }
        }

        orb.vx *= 0.986;
        orb.vy *= 0.986;
        orb.vz *= 0.991;

        const screenProjection = projectOrb(orb, width, height);
        const scale = Math.max(screenProjection.scale, 0.001);
        const xMin = width / 2 - (width / 2) / scale + orb.r;
        const xMax = width / 2 + (width / 2) / scale - orb.r;
        const yMin = height / 2 - (height / 2) / scale + orb.r;
        const yMax = height / 2 + (height / 2) / scale - orb.r;

        if (orb.x < xMin) {
          orb.x = xMin;
          orb.vx = Math.abs(orb.vx) * 0.96;
        } else if (orb.x > xMax) {
          orb.x = xMax;
          orb.vx = -Math.abs(orb.vx) * 0.96;
        }

        if (orb.y < yMin) {
          orb.y = yMin;
          orb.vy = Math.abs(orb.vy) * 0.96;
        } else if (orb.y > yMax) {
          orb.y = yMax;
          orb.vy = -Math.abs(orb.vy) * 0.96;
        }

        if (orb.z - orb.r < DEPTH_NEAR) {
          orb.z = DEPTH_NEAR + orb.r;
          orb.vz = Math.abs(orb.vz) * 0.92;
        } else if (orb.z + orb.r > DEPTH_FAR) {
          orb.z = DEPTH_FAR - orb.r;
          orb.vz = -Math.abs(orb.vz) * 0.92;
        }
      }

      for (let i = 0; i < world.length; i += 1) {
        for (let j = i + 1; j < world.length; j += 1) {
          const a = world[i];
          const b = world[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dz = b.z - a.z;
          const distance = Math.hypot(dx, dy, dz) || 0.001;
          const minDistance = a.r + b.r;

          if (distance >= minDistance) {
            continue;
          }

          const nx = dx / distance;
          const ny = dy / distance;
          const nz = dz / distance;
          const overlap = minDistance - distance;
          const massA = a.r * a.r;
          const massB = b.r * b.r;
          const total = massA + massB;
          const push = overlap * SEPARATION_FORCE;

          a.x -= nx * ((overlap * (massB / total)) + push);
          a.y -= ny * ((overlap * (massB / total)) + push);
          a.z -= nz * ((overlap * (massB / total)) + push);
          b.x += nx * ((overlap * (massA / total)) + push);
          b.y += ny * ((overlap * (massA / total)) + push);
          b.z += nz * ((overlap * (massA / total)) + push);

          const relVx = b.vx - a.vx;
          const relVy = b.vy - a.vy;
          const relVz = b.vz - a.vz;
          const velocityAlongNormal = relVx * nx + relVy * ny + relVz * nz;

          if (velocityAlongNormal > 0) {
            continue;
          }

          const restitution = 0.92;
          const impulse = (-(1 + restitution) * velocityAlongNormal) / (1 / massA + 1 / massB);
          const impulseX = impulse * nx;
          const impulseY = impulse * ny;
          const impulseZ = impulse * nz;

          a.vx -= impulseX / massA;
          a.vy -= impulseY / massA;
          a.vz -= impulseZ / massA;
          b.vx += impulseX / massB;
          b.vy += impulseY / massB;
          b.vz += impulseZ / massB;
        }
      }

      draw();
      raf = requestAnimationFrame(tick);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(host);
    window.addEventListener("resize", onResize);

    const updatePointer = (event: PointerEvent, active: boolean) => {
      const rect = host.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active,
      };
    };

    const onHostPointerMove = (event: PointerEvent) => {
      updatePointer(event, true);
    };

    const onHostPointerLeave = () => {
      pointerRef.current.active = false;
    };

    host.addEventListener("pointermove", onHostPointerMove, { passive: true });
    host.addEventListener("pointerenter", onHostPointerMove, { passive: true });
    host.addEventListener("pointerleave", onHostPointerLeave);
    host.addEventListener("pointercancel", onHostPointerLeave);

    draw();
    raf = requestAnimationFrame(tick);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      host.removeEventListener("pointermove", onHostPointerMove);
      host.removeEventListener("pointerenter", onHostPointerMove);
      host.removeEventListener("pointerleave", onHostPointerLeave);
      host.removeEventListener("pointercancel", onHostPointerLeave);
      cancelAnimationFrame(raf);
    };
  }, [randomizedLabelPool]);

  return (
    <div
      ref={wrapRef}
      className="tech-orb-field"
      aria-label="Interactive 3D tech stack simulation"
    >
      <canvas ref={canvasRef} className="tech-orb-canvas" />
    </div>
  );
}
