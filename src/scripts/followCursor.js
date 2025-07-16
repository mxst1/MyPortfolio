const load = () => {
  const cursor = document.getElementById("cursor");
  if (!cursor) return;

  window.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
};

export default load;
