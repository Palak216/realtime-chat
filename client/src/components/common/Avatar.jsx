const Avatar = ({ name, size = 48, online = false }) => {
  const initial = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div className="relative">
      <div
        className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg select-none"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${size / 2.3}px`,
        }}
      >
        {initial}
      </div>

      {online && (
        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-slate-900"></span>
      )}
    </div>
  );
};

export default Avatar;