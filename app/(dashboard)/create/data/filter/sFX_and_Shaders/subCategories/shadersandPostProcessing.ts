import type { Filter } from "../../typeFilters";

export const shadersandPostProcessingFilters: Filter[] = [
  {
    id: "Ray Traced_7_3_1",
    name: "Ray Traced",
    description: "Apply ray tracing techniques for realistic rendering.",
    style: "Ray Traced",
    image: "/images/filters/Ray_Traced.webp",
    isSelected: false,
  },
  {
    id: "Ray Tracing Ambient Occlusion_7_3_2",
    name: "Ray Tracing Ambient Occlusion",
    description: "Add ambient occlusion effects using ray tracing.",
    style: "Ray Tracing Ambient Occlusion",
    image: "/images/filters/Ray_Tracing_Ambient_Occlusion.webp",
    isSelected: false,
  },
  {
    id: "RTX_7_3_3",
    name: "RTX",
    description: "Utilize RTX technology for advanced rendering capabilities.",
    style: "RTX",
    image: "/images/filters/RTX.webp",
    isSelected: false,
  },
  {
    id: "Shaders_7_9_1",
    name: "Shaders",
    description: "Apply custom shaders for visual effects and rendering.",
    style: "Shaders",
    image: "/images/filters/Shaders.webp",
    isSelected: false,
  },
  {
    id: "OpenGL-Shaders_7_9_2",
    name: "OpenGL-Shaders",
    description: "Utilize OpenGL shaders for enhanced graphics processing.",
    style: "OpenGL-Shaders",
    image: "/images/filters/OpenGL-Shaders.webp",
    isSelected: false,
  },
  {
    id: "GLSL-Shaders_7_9_3",
    name: "GLSL-Shaders",
    description: "Apply GLSL shaders for advanced graphical effects.",
    style: "GLSL-Shaders",
    image: "/images/filters/GLSL-Shaders.webp",
    isSelected: false,
  },
  {
    id: "Anti-Aliasing_7_15_1",
    name: "Anti-Aliasing",
    description: "Reduce aliasing artifacts for smoother edges in your image.",
    style: "Anti-Aliasing",
    image: "/images/filters/Anti-Aliasing.webp",
    isSelected: false,
  },
  {
    id: "FXAA_7_15_2",
    name: "FXAA",
    description: "Apply Fast Approximate Anti-Aliasing for smoother visuals.",
    style: "FXAA",
    image: "/images/filters/FXAA.webp",
    isSelected: false,
  },
  {
    id: "TXAA_7_15_3",
    name: "TXAA",
    description:
      "Apply Temporal Anti-Aliasing for high-quality edge smoothing.",
    style: "TXAA",
    image: "/images/filters/TXAA.webp",
    isSelected: false,
  },
  {
    id: "Sharpen_7_21_1",
    name: "Sharpen",
    description: "Enhance image details and sharpen edges for a crisp look.",
    style: "Sharpen",
    image: "/images/filters/Sharpen.webp",
    isSelected: false,
  },
  {
    id: "Spot-Healing_7_21_2",
    name: "Spot-Healing",
    description: "Heal and remove blemishes or imperfections from your image.",
    style: "Spot-Healing",
    image: "/images/filters/Spot-Healing.webp",
    isSelected: false,
  },
  {
    id: "Digitally Enhanced_7_21_3",
    name: "Digitally Enhanced",
    description: "Apply digital enhancements for a polished and refined look.",
    style: "Digitally Enhanced",
    image: "/images/filters/Digitally_Enhanced.webp",
    isSelected: false,
  },
  {
    id: "Post Processing_7_27_1",
    name: "Post Processing",
    description: "Apply various post-processing effects to your image.",
    style: "Post Processing",
    image: "/images/filters/Post_Processing.webp",
    isSelected: false,
  },
  {
    id: "Post-Processing_7_27_2",
    name: "Post-Processing",
    description: "Enhance your image using post-processing techniques.",
    style: "Post-Processing",
    image: "/images/filters/Post-Processing.webp",
    isSelected: false,
  },
  {
    id: "Post-Production_7_27_3",
    name: "Post-Production",
    description:
      "Refine and finalize your image through post-production methods.",
    style: "Post-Production",
    image: "/images/filters/Post-Production.webp",
    isSelected: false,
  },
  {
    id: "Haze_7_33_1",
    name: "Haze",
    description: "Add a subtle haze effect to your image for atmosphere.",
    style: "Haze",
    image: "/images/filters/Haze.webp",
    isSelected: false,
  },
  {
    id: "Volumetric Haze_7_33_2",
    name: "Volumetric Haze",
    description: "Create volumetric atmospheric haze for depth and realism.",
    style: "Volumetric Haze",
    image: "/images/filters/Volumetric_Haze.webp",
    isSelected: false,
  },
  {
    id: "Tone Mapping_7_39_1",
    name: "Tone Mapping",
    description: "Adjust the tone and color balance of your image.",
    style: "Tone Mapping",
    image: "/images/filters/Tone_Mapping.webp",
    isSelected: false,
  },
  {
    id: "VFX_7_45_1",
    name: "VFX",
    description: "Add visual effects to enhance the impact of your image.",
    style: "VFX",
    image: "/images/filters/VFX.webp",
    isSelected: false,
  },
  {
    id: "SFX_7_45_2",
    name: "SFX",
    description:
      "Apply special effects to create a captivating visual experience.",
    style: "SFX",
    image: "/images/filters/SFX.webp",
    isSelected: false,
  },
  {
    id: "CGI_7_45_3",
    name: "CGI",
    description:
      "Achieve computer-generated imagery (CGI) effects in your image.",
    style: "CGI",
    image: "/images/filters/CGI.webp",
    isSelected: false,
  },
  {
    id: "SSAO_7_51_1",
    name: "SSAO",
    description: "Simulate ambient occlusion effects for realistic shading.",
    style: "SSAO",
    image: "/images/filters/SSAO.webp",
    isSelected: false,
  },
  {
    id: "De-Noise_7_51_2",
    name: "De-Noise",
    description: "Reduce noise and grain in your image for a cleaner look.",
    style: "De-Noise",
    image: "/images/filters/De-Noise.webp",
    isSelected: false,
  },
  {
    id: "Flat Shading_7_58_1",
    name: "Flat Shading",
    description: "Apply flat shading for a simplified and stylized look.",
    style: "Flat Shading",
    image: "/images/filters/Flat_Shading.webp",
    isSelected: false,
  },
  {
    id: "Gouraud Shading_7_58_2",
    name: "Gouraud Shading",
    description: "Apply Gouraud shading for smooth shading transitions.",
    style: "Gouraud Shading",
    image: "/images/filters/Gouraud_Shading.webp",
    isSelected: false,
  },
  {
    id: "Phong Shading_7_58_3",
    name: "Phong Shading",
    description:
      "Apply Phong shading for specular highlights and smooth shading.",
    style: "Phong Shading",
    image: "/images/filters/Phong_Shading.webp",
    isSelected: false,
  },
  {
    id: "Cel Shading_7_64_1",
    name: "Cel Shading",
    description: "Apply cel shading for a stylized cartoon-like appearance.",
    style: "Cel Shading",
    image: "/images/filters/Cel_Shading.webp",
    isSelected: false,
  },
  {
    id: "Gooch Shading_7_64_2",
    name: "Gooch Shading",
    description:
      "Apply Gooch shading for a warm and cool tone-based appearance.",
    style: "Gooch Shading",
    image: "/images/filters/Gooch_Shading.webp",
    isSelected: false,
  },
];
