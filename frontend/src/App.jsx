import { useState, useRef } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(false);

  const dropRef = useRef(null);
  const cameraInput = useRef(null);

  // ==============================
  // DEFECT INFO TEXT
  // ==============================
  const defectInfo = {
    crazing: "Network-type cracks caused by tensile stress on the steel surface.",
    inclusion: "Foreign particles trapped inside the metal during formation.",
    patches: "Dark cloudy areas from oxidation or corrosion reactions.",
    pitted_surface: "Circular pits formed due to chemical surface erosion.",
    rolled_in_scale: "Metal flakes pressed into surface during rolling process.",
    scratches: "Linear grooves formed due to abrasion and friction."
  };

  // ==============================
  // IMAGE LOADING
  // ==============================
  function loadFile(imgFile) {
    setFile(imgFile);
    setResults(null);

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(imgFile);
  }

  function handleFileSelect(e) {
    const imgFile = e.target.files[0];
    if (!imgFile) return;
    loadFile(imgFile);
  }

  // ==============================
  // CAMERA CAPTURE
  // ==============================
  function handleCameraCapture(e) {
    const imgFile = e.target.files[0];
    if (!imgFile) return;
    loadFile(imgFile);
  }

  // ==============================
  // DRAG + DROP
  // ==============================
  function handleDrop(e) {
    e.preventDefault();
    const imgFile = e.dataTransfer.files[0];
    if (!imgFile) return;
    loadFile(imgFile);
    dropRef.current.classList.remove("border-cyan-400");
  }

  function handleDragOver(e) {
    e.preventDefault();
    dropRef.current.classList.add("border-cyan-400");
  }

  function handleDragLeave() {
    dropRef.current.classList.remove("border-cyan-400");
  }

  // ==============================
  // API CALL
  // ==============================
  async function upload() {
    if (!file) return;

    setLoading(true);
    setResults(null);

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: form
      });

      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      console.error("Prediction error:", err);
    }

    setLoading(false);
  }

  // ==============================
  // PARTICLES GENERATION
  // ==============================
  function createParticles(count) {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 8 + 5,
      left: Math.random() * 100 + "vw",
      delay: Math.random() * 5 + "s",
      color: `hsla(${Math.random() * 360}, 80%, 60%, 0.8)`
    }));
  }

  const particles = createParticles(100);

  // ==============================
  // UI
  // ==============================
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative">

      {/* FLOATING PARTICLES */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              backgroundColor: p.color,
              animationDelay: p.delay
            }}
          />
        ))}
      </div>

      {/* MAIN CARD */}
      <div className="
        neon-card relative z-10
        backdrop-blur-xl bg-white/5 border border-white/10 
        rounded-3xl w-full max-w-lg p-10 space-y-6
        hover:shadow-[0_0_45px_rgba(0,255,255,0.35)]
        transition-all duration-500
      ">

        {/* TITLE */}
        <h1 className="
          text-3xl font-bold text-center text-transparent 
          bg-clip-text bg-gradient-to-r 
          from-cyan-300 via-blue-500 to-purple-600 
          animate-pulse tracking-wider
        ">
          Steel Defect Detector
        </h1>

        {/* DRAG + DROP */}
        <div
          ref={dropRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className="
            border-2 border-dashed rounded-xl w-full h-40
            flex items-center justify-center cursor-pointer
            bg-black/30 overflow-hidden transition-all duration-300
            hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]
          "
          onClick={() => document.getElementById("fileInput").click()}
        >
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="h-full w-full object-contain rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
                setZoom(true);
              }}
            />
          ) : (
            <p className="text-gray-400">
              Drag & drop or click to upload image
            </p>
          )}
        </div>

        {/* HIDDEN INPUT */}
        <input 
          id="fileInput"
          type="file" 
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* CAMERA INPUT */}
        <input
          ref={cameraInput}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleCameraCapture}
        />

        {/* CAMERA BUTTON */}
        <button
          onClick={() => cameraInput.current.click()}
          className="
            bg-purple-600 hover:bg-purple-700 
            w-full py-3 rounded-xl font-medium
          "
        >
          Use Camera
        </button>

        {/* PREDICT BUTTON */}
        <button 
          onClick={upload}
          disabled={!file}
          className="
            bg-blue-600 hover:bg-blue-700 
            disabled:bg-gray-700 disabled:cursor-not-allowed
            text-white w-full py-3 rounded-xl font-medium
          "
        >
          Predict
        </button>

        {/* LOADING SPINNER */}
        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin border-4 border-gray-500 border-t-blue-500 rounded-full w-12 h-12"></div>
          </div>
        )}

        {/* RESULTS */}
        {results && (
          <div className="space-y-5 text-left">

            {results.map((item, index) => (
              <div key={index} className="
                bg-white/5 border border-white/10 rounded-xl p-4
                shadow-[0_0_20px_rgba(0,255,255,0.15)]
              ">
                
                <p className="text-lg font-semibold text-white uppercase tracking-wide">
                  {item.class}
                </p>

                <div className="w-full bg-gray-800 h-3 rounded-lg overflow-hidden mt-2">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 via-yellow-300 to-red-400 transition-all duration-700"
                    style={{ width: `${(item.confidence * 100).toFixed(0)}%` }}
                  />
                </div>

                <p className="text-sm text-white mt-1">
                  {(item.confidence * 100).toFixed(2)}%
                </p>

                {/* DEFECT DESCRIPTION */}
                <p className="text-xs text-gray-300 mt-1 italic leading-relaxed">
                  {defectInfo[item.class]}
                </p>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* FULLSCREEN ZOOM MODAL */}
      {zoom && preview && (
        <div
          className="
            fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center 
            justify-center z-50 cursor-pointer
          "
          onClick={() => setZoom(false)}
        >
          <img
            src={preview}
            className="
              max-h-[90%] max-w-[90%] rounded-xl
              shadow-[0_0_40px_rgba(0,255,255,0.5)]
            "
          />
        </div>
      )}
    </div>
  );
}
