window.addEventListener("load", _ => {
    const canvas = document.getElementById("input");
    const ctx = canvas.getContext('2d');

    const CHUNK_SIZE = 6;
    const BLOCK_SIZE = 128;
    const chunk = [
        0, 0, 0, 0, 0, 1,
        1, 2, 2, 2, 2, 2,
        0, 0, 0, 0, 0, 0,
        0, 0, 2, 2, 2, 1,
        1, 1, 2, 2, 2, 2,
        2, 2, 1, 1, 1, 1,
    ];
});