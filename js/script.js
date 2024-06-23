const listImage = document.querySelector('.list');
const imgs = document.querySelectorAll('.list img');
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');
const length = imgs.length;
let current = 0;

// Sao chép thủ công 8 hình ảnh đầu tiên và 8 hình ảnh cuối cùng
const firstClones = [
    imgs[0].cloneNode(true),
    imgs[1].cloneNode(true),
    imgs[2].cloneNode(true),
    imgs[3].cloneNode(true),
    imgs[4].cloneNode(true),
    imgs[5].cloneNode(true),
    imgs[6].cloneNode(true),
    imgs[7].cloneNode(true)
];

const lastClones = [
    imgs[length - 1].cloneNode(true),
    imgs[length - 2].cloneNode(true),
    imgs[length - 3].cloneNode(true),
    imgs[length - 4].cloneNode(true),
    imgs[length - 5].cloneNode(true),
    imgs[length - 6].cloneNode(true),
    imgs[length - 7].cloneNode(true),
    imgs[length - 8].cloneNode(true)
];

// Thêm các bản sao vào list
firstClones.forEach(clone => listImage.appendChild(clone));
lastClones.reverse().forEach(clone => listImage.insertBefore(clone, imgs[0]));

// Điều chỉnh vị trí ban đầu
let width = imgs[0].offsetWidth;
listImage.style.transform = `translateX(${-width * 8}px)`;

const handleChangeSlide = (direction = 1) => {
    current += direction;
    listImage.style.transition = 'transform 0.5s ease-in-out';
    listImage.style.transform = `translateX(${-width * (current + 8)}px)`;

    // Chờ cho chuyển đổi kết thúc
    setTimeout(() => {
        if (current >= length-16) {
            current = 0;
            listImage.style.transition = 'none';
            listImage.style.transform = `translateX(${-width * 8}px)`;
        } else if (current < 0) {
            current = length - 1;
            listImage.style.transition = 'none';
            listImage.style.transform = `translateX(${-width * (length + 7)}px)`;
        }
    }, 500);

    // Cập nhật chỉ số hoạt động
    document.querySelector('.active').classList.remove('active');
    document.querySelector('.index-item-' + (current % length)).classList.add('active');
};

let handleEventChangeSlide = setInterval(() => handleChangeSlide(1), 4000);

btnRight.addEventListener('click', () => {
    clearInterval(handleEventChangeSlide);
    handleChangeSlide(1);
    handleEventChangeSlide = setInterval(() => handleChangeSlide(1), 4000);
});

btnLeft.addEventListener('click', () => {
    clearInterval(handleEventChangeSlide);
    handleChangeSlide(-1);
    handleEventChangeSlide = setInterval(() => handleChangeSlide(1), 4000);
});
