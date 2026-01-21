import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Video, ShoppingBag, Camera, Edit, ArrowUpCircle, Check } from 'lucide-react';

// --- DATA SOURCE FROM USER GUIDE & COMPUTATIONAL ANALYSIS ---

const CATEGORIES = {
  animation: {
    id: 'animation',
    label: 'Animation (Video)',
    icon: <Video size={20} />,
    placeholder: "A surreal expressionist painting of a jazz band...",
    description: "Describe the scene movement, texture, and medium. For stylized art, focus on 'medium artifacts' and motion type.",
    models: [
      { name: "Wan 2.1", desc: "Open-source 'Stylistic Chameleon'; superior for long-term style consistency & LoRA training." },
      { name: "Kling AI (v2.5)", desc: "Best for physics-based texture ('Motion Brush') and complex character animation." },
      { name: "Runway Gen-3 Alpha", desc: "Excels in cinematic camera language (e.g., zooming into canvas)." },
      { name: "Sora 2 Pro", desc: "Powerful model for rich, detailed, physics-compliant clips." }
    ],
    fields: [
      {
        key: 'style',
        label: 'Art Style & Texture',
        options: [
          '',
          'Thick impasto acrylic',
          'Visible brushstrokes',
          'Palette knife texture',
          'Fauvist color palette',
          'Expressionist masterpiece',
          'Surreal expressionist',
          'Hallucinogenic visual style',
          'Rough canvas texture',
          'Hand-drawn animation look',
          'Cinematic realism'
        ]
      },
      {
        key: 'motion',
        label: 'Motion Dynamics',
        options: [
          '',
          'Viscous fluid flow',
          'Living painting effect',
          'Staccato jazz movement',
          'Oscillating vector',
          'Frozen subject / Moving background',
          'Liquid paint flow',
          'Smoothly panning',
          'Sudden jump cut',
          'Seamless transition',
          'Looped animation'
        ]
      },
      {
        key: 'camera',
        label: 'Camera Language',
        options: [
          '',
          'Dolly in (Deep)',
          'Multiplane parallax effect',
          'Truck left/right',
          'Tracking shot',
          'First-person POV',
          'Wide-angle panorama',
          'Zoom in',
          'Panning across',
          'Tilting up',
          'Slow motion'
        ]
      },
      {
        key: 'negative',
        label: 'Negative Constraints (Avoid)',
        options: [
          '',
          'Photorealistic / 3D Render',
          'Bokeh / Depth of Field',
          'Smooth Animation / Morphing',
          'Vector Art / Cartoon',
          'Melting / Distorting',
          'Volumetric Fog / Realistic Lighting'
        ]
      }
    ]
  },
  product: {
    id: 'product',
    label: 'Product Photography',
    icon: <ShoppingBag size={20} />,
    placeholder: "A luxury wristwatch...",
    description: "Crisp, high-detail images. Define the studio setup, lighting, and texture.",
    models: [
      { name: "Krea 1", desc: "Flagship model for realistic textures without the 'AI look'." },
      { name: "Google Imagen 4", desc: "Extremely sharp; nails text and logos on products." },
      { name: "Flux 1.1 Pro Ultra", desc: "Polished, high-quality outputs for professional use." }
    ],
    fields: [
      {
        key: 'lighting',
        label: 'Lighting Setup',
        options: [
          '',
          'Softbox studio lighting',
          'Diffused light with soft shadows',
          'Dramatic spotlight',
          'Backlighting (backlit glow)',
          'Rim lighting on edges',
          'High-key lighting (bright)',
          'Low-key lighting (dark)',
          'Reflective highlights',
          'Ambient lighting'
        ]
      },
      {
        key: 'background',
        label: 'Background & Context',
        options: [
          '',
          'Seamless white background',
          'Black velvet backdrop',
          'Gradient backdrop',
          'In a lightbox',
          'On a reflective surface',
          'On a marble countertop',
          'Held in hand',
          'Lifestyle setting (desk)',
          'Lifestyle setting (nature)'
        ]
      },
      {
        key: 'texture',
        label: 'Texture & Material',
        options: [
          '',
          'Glossy finish',
          'Matte texture',
          'Metallic sheen',
          'Polished chrome',
          'Textured fabric',
          'Leather grain',
          'Glass transparency',
          'Ceramic shine',
          'Wood grain detail',
          'Waterproof droplets'
        ]
      },
      {
        key: 'angle',
        label: 'Camera Angle',
        options: [
          '',
          'Close-up macro shot',
          'Top-down flat lay',
          'Eye-level angle',
          '45-degree angle',
          'Side profile shot',
          'Wide aperture (bokeh)',
          'Telephoto shot',
          'Centered composition'
        ]
      }
    ]
  },
  realistic: {
    id: 'realistic',
    label: 'Realistic Photos',
    icon: <Camera size={20} />,
    placeholder: "A young woman hiking in a dense rainforest...",
    description: "Hyper-realistic portraits and landscapes. Include Who, What, Where, When, and How.",
    models: [
      { name: "Krea 1", desc: "Crisp textures and deep understanding of art styles." },
      { name: "Google Imagen 4", desc: "Faithful realism with correct fine details." },
      { name: "Seedream 4.5", desc: "High-quality photorealism and natural details." }
    ],
    fields: [
      {
        key: 'lighting',
        label: 'Lighting & Time',
        options: [
          '',
          'Golden hour (warm sunrise/sunset)',
          'Blue hour (dawn/dusk)',
          'Midday harsh sunlight',
          'Overcast diffuse light',
          'Dappled light through trees',
          'Neon-lit night',
          'Candlelight',
          'Indoor soft lamp light',
          'Chiaroscuro'
        ]
      },
      {
        key: 'camera',
        label: 'Camera & Lens',
        options: [
          '',
          '35mm film photograph',
          'DSLR photo',
          '8K digital photo',
          'Wide-angle lens (16mm)',
          'Telephoto lens (200mm)',
          'Macro lens',
          'f/1.4 bokeh',
          'Long exposure',
          'GoPro footage'
        ]
      },
      {
        key: 'atmosphere',
        label: 'Atmosphere & Weather',
        options: [
          '',
          'Foggy morning',
          'Misty atmosphere',
          'Light rain with raindrops',
          'Snow flurries',
          'Clear sky',
          'Dramatic storm clouds',
          'Hazy desert sunlight',
          'Humid jungle mist',
          'Urban smoggy light'
        ]
      },
      {
        key: 'style',
        label: 'Color & Grade',
        options: [
          '',
          'Vibrant high-saturation',
          'Muted color palette',
          'Cinematic teal-orange',
          'Black and white film',
          'Sepia tone',
          'Vintage film look',
          'Polaroid instant photo',
          'Hyperrealistic'
        ]
      }
    ]
  },
  editing: {
    id: 'editing',
    label: 'Image Editing',
    icon: <Edit size={20} />,
    placeholder: "The trash bin from the lower left corner...",
    description: "Modifying existing images. Combine an Action with a Target and a Style.",
    models: [
      { name: "Nano Banana Pro", desc: "Handles 4K images and fine detailed edits." },
      { name: "Flux Kontext Pro", desc: "Advanced reasoning for complex style transfers." },
      { name: "Nano Banana", desc: "Smart, fast model built specifically for editing." }
    ],
    fields: [
      {
        key: 'action',
        label: 'Action',
        options: [
          '',
          'Remove',
          'Add',
          'Replace',
          'Transform',
          'Brighten',
          'Darken',
          'Recolor',
          'Clean up',
          'Turn into'
        ]
      },
      {
        key: 'lighting',
        label: 'Lighting Adjustment',
        options: [
          '',
          'Make brighter',
          'Turn into night scene',
          'Add warm sunlight',
          'Add soft ambient glow',
          'Increase contrast',
          'Add dramatic shadows',
          'Desaturate colors'
        ]
      },
      {
        key: 'transformation',
        label: 'Style Transformation',
        options: [
          '',
          'Oil painting style',
          'Pencil sketch style',
          'Watercolor style',
          'Pixar-like 3D render',
          'Retro 8-bit pixel art',
          'Futuristic hologram',
          'Vintage filter',
          'Film grain'
        ]
      }
    ]
  },
  upscaling: {
    id: 'upscaling',
    label: 'Upscaling',
    icon: <ArrowUpCircle size={20} />,
    placeholder: "Describe the details you want enhanced...",
    description: "Guide the AI on what details or style to emphasize during enhancement.",
    models: [
      { name: "Krea Enhance", desc: "Imagines new detail; great for sharpening AI images." },
      { name: "Upscale V1", desc: "Fast, neutral upscaling that preserves original details." },
      { name: "Bloom", desc: "Upscales up to 8K with stunning, faithful detail." }
    ],
    fields: [
      {
        key: 'clarity',
        label: 'Clarity & Detail',
        options: [
          '',
          'Tack sharp',
          'Ultra-detailed',
          'Crisp focus',
          'Richly textured',
          'Defined edges',
          'Readable text',
          '4K detail',
          '8K resolution'
        ]
      },
      {
        key: 'improvement',
        label: 'Quality Improvements',
        options: [
          '',
          'De-noise',
          'Remove blur',
          'Reduce compression artifacts',
          'Enhance contrast',
          'Boost brightness',
          'Restore details',
          'Stabilize',
          'Artifact removal'
        ]
      },
      {
        key: 'style',
        label: 'Style Preservation',
        options: [
          '',
          'Natural colors',
          'Vivid colors',
          'Cinematic look',
          'Painterly detail',
          'Photorealistic detail',
          'Subtle grain',
          'Sharpen without oversharpening'
        ]
      }
    ]
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('animation');
  const [subject, setSubject] = useState('');
  const [selections, setSelections] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const currentCategory = CATEGORIES[activeTab];

  // Reset selections when tab changes
  useEffect(() => {
    setSelections({});
    setSubject('');
    setCopied(false);
  }, [activeTab]);

  // Update prompt whenever inputs change
  useEffect(() => {
    let promptParts = [];
    let negativeParts = [];
    
    // Logic for constructing the prompt
    // 1. Add Subject
    if (subject.trim()) {
      promptParts.push(subject.trim());
    }

    // 2. Add Selected Fields
    currentCategory.fields.forEach(field => {
      const val = selections[field.key];
      if (val) {
        if (field.key === 'negative') {
          // Handle negative constraints specifically
          negativeParts.push(val);
        } else {
          promptParts.push(val);
        }
      }
    });

    // Join with commas and proper spacing
    let fullPrompt = promptParts.join(', ');
    
    // Append negative constraints if any
    if (negativeParts.length > 0) {
      fullPrompt += ` --no ${negativeParts.join(', ')}`;
    }

    setGeneratedPrompt(fullPrompt);
  }, [subject, selections, currentCategory]);

  const handleSelectionChange = (key, value) => {
    setSelections(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const copyToClipboard = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt); 
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B1021] text-slate-100 p-4 md:p-8 font-sans selection:bg-purple-500 selection:text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row items-center md:items-start gap-5 text-center md:text-left">
          <img 
            src="https://framerusercontent.com/images/XV0d8crig8yCUPePjC10nnwJEIk.png?scale-down-to=512" 
            alt="Krea AI Logo" 
            className="w-16 h-16 rounded-xl object-contain bg-[#151B2E]"
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Prompt Architect
            </h1>
            <p className="text-slate-400 text-sm md:text-base">
              Build precise prompts for Krea AI and other cutting-edge models.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.values(CATEGORIES).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeTab === cat.id 
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' 
                      : 'bg-[#151B2E] text-slate-400 hover:bg-[#1E253A] hover:text-white'
                    }`}
                >
                  {cat.icon}
                  <span className="hidden sm:inline">{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="bg-[#151B2E]/50 border border-[#2A324A] rounded-xl p-6 shadow-xl">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-purple-300 uppercase tracking-wider">
                    Core Subject
                  </label>
                  <span className="text-xs text-slate-500">The main focus of your generation</span>
                </div>
                <textarea
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={currentCategory.placeholder}
                  className="w-full h-24 bg-[#0B1021] border border-[#2A324A] rounded-lg p-3 text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none transition-all"
                />
                <p className="mt-2 text-xs text-slate-400 italic">
                  {currentCategory.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentCategory.fields.map((field) => (
                  <div key={field.key} className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400 ml-1">
                      {field.label}
                    </label>
                    <div className="relative">
                      <select
                        value={selections[field.key] || ''}
                        onChange={(e) => handleSelectionChange(field.key, e.target.value)}
                        className={`w-full appearance-none border rounded-lg py-2.5 px-3 pr-8 text-sm focus:ring-2 outline-none cursor-pointer hover:border-slate-500 transition-colors
                          ${field.key === 'negative' 
                            ? 'bg-red-900/10 border-red-900/30 text-red-100 focus:ring-red-500' 
                            : 'bg-[#0B1021] border-[#2A324A] text-slate-200 focus:ring-purple-500'
                          }`}
                      >
                        <option value="">Select option...</option>
                        {field.options.map((opt, idx) => (
                          <option key={idx} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-6">
              <div className="bg-gradient-to-b from-[#151B2E] to-[#0B1021] border border-[#2A324A] rounded-xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <RefreshCw size={18} className="text-green-400" />
                    Generated Prompt
                  </h2>
                  <div className="px-2 py-1 bg-[#151B2E] rounded text-xs font-mono text-slate-400 border border-[#2A324A]">
                    {generatedPrompt.length} chars
                  </div>
                </div>

                <div className="min-h-[200px] bg-black/30 rounded-lg p-4 mb-4 border border-[#2A324A]/50 font-mono text-sm leading-relaxed text-slate-200 break-words whitespace-pre-wrap shadow-inner">
                  {generatedPrompt || <span className="text-slate-600 italic">Your prompt will appear here as you build it...</span>}
                </div>

                <button
                  onClick={copyToClipboard}
                  disabled={!generatedPrompt}
                  className={`w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-200 
                    ${!generatedPrompt 
                      ? 'bg-[#1E253A] text-slate-600 cursor-not-allowed' 
                      : copied 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-900/40 transform active:scale-[0.98]'
                    }`}
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                  {copied ? 'Copied to Clipboard!' : 'Copy Prompt'}
                </button>
              </div>

              {/* Tips Section based on Category */}
              <div className="mt-6 bg-blue-900/10 border border-blue-900/20 rounded-xl p-4">
                <h3 className="text-blue-200 font-semibold text-sm mb-2">Pro Tip for {currentCategory.label}</h3>
                <p className="text-blue-300/80 text-xs leading-relaxed mb-4">
                  {activeTab === 'animation' && "For stylized art, negate 'depth of field' to avoid the plastic filter look. Use terms like 'viscous fluid' for painterly motion."}
                  {activeTab === 'product' && "For e-commerce, specify 'seamless white background'. For branding, mention specific textures like 'matte' or 'glossy' to ensure material accuracy."}
                  {activeTab === 'realistic' && "Structure your prompt: Subject + Environment + Lighting + Camera. Use terms like '50mm f/1.8' for depth of field."}
                  {activeTab === 'editing' && "Focus on one change at a time. If removing an object, describe what should replace it (e.g., 'empty street' or 'tree')."}
                  {activeTab === 'upscaling' && "You don't need a long prompt. Just keywords like 'tack sharp', '8k', and 'de-noise' are enough to guide the enhancer."}
                </p>

                {currentCategory.models && (
                  <>
                    <h4 className="text-blue-200 font-semibold text-xs uppercase tracking-wider mb-2 border-t border-blue-900/20 pt-3">
                      Recommended Models
                    </h4>
                    <ul className="space-y-2">
                      {currentCategory.models.map((model, idx) => (
                        <li key={idx} className="text-xs flex flex-col sm:block">
                          <span className="font-bold text-purple-300 mr-1">{model.name}:</span>
                          <span className="text-blue-200/70">{model.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}