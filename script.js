// 打字机效果 - 等待DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
    var phrases = [
        "一次买断，永久使用",
        "一次买断，永久加速魔兽世界",
        "一次买断，永久加速魔兽乌龟服",
        "一次买断，永久加速Github",
        "一次买断，永久加速GTA5",
        "一次买断，永久加速鹅鸭杀",
        "一次买断，永久加速PUBG",
        "一次买断，永久加速绝地求生",
        "一次买断，永久加速APEX英雄",
        "一次买断，永久加速战地6",
        "一次买断，永久加速星际战甲",
        "一次买断，永久加速Roblox",
        "一次买断，永久加速我的世界",
        "一次买断，永久加速街霸6",
        "一次买断，永久加速我的世界",
        "一次买断，永久加速CSGO2",
        "一次买断，永久加速吃鸡"
    ];

    var currentPhraseIndex = 0;
    var currentText = "";
    var isDeleting = false;
    var typewriterElement = document.getElementById('typewriter-text');
    var isFirstRun = true;
    var needContinueDelete = false;

    function getRandomPhraseIndex(excludeIndex) {
        var newIndex;
        do {
            newIndex = Math.floor(Math.random() * phrases.length);
        } while (newIndex === excludeIndex);
        return newIndex;
    }

    function getBaseText(phrase) {
        if (phrase.includes("加速")) {
            return "一次买断，永久加速";
        } else {
            return "一次买断，永久";
        }
    }

    function typeWriter() {
        var currentPhrase = phrases[currentPhraseIndex];
        var baseText = getBaseText(currentPhrase);

        if (isFirstRun) {
            currentText = currentPhrase;
            isFirstRun = false;
            isDeleting = false;
            typeSpeed = 2000;
        } else if (needContinueDelete) {
            currentText = currentText.substring(0, currentText.length - 1);
            typeSpeed = 50;
            if (currentText === baseText) {
                needContinueDelete = false;
                isDeleting = false;
                typeSpeed = 500;
            }
        } else if (isDeleting) {
            currentText = currentPhrase.substring(0, currentText.length - 1);
            typeSpeed = 50;
        } else {
            currentText = currentPhrase.substring(0, currentText.length + 1);
            typeSpeed = 100;
        }

        typewriterElement.innerHTML = currentText + '<span id="typewriter-cursor" style="display: inline-block; width: 5px; height: 1em; background: #87abff; margin-left: 2px; margin-top: -0.2em; vertical-align: middle; border-radius: 2px; animation: blink 1s infinite;"></span>';

        if (!isDeleting && currentText === currentPhrase) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentText === baseText) {
            var nextPhraseIndex = getRandomPhraseIndex(currentPhraseIndex);
            var nextPhrase = phrases[nextPhraseIndex];
            var nextBaseText = getBaseText(nextPhrase);

            if (currentText.length > nextBaseText.length) {
                needContinueDelete = true;
                currentPhraseIndex = nextPhraseIndex;
                typeSpeed = 500;
            } else {
                isDeleting = false;
                currentPhraseIndex = nextPhraseIndex;
                typeSpeed = 500;
            }
        }

        setTimeout(typeWriter, typeSpeed);
    }

    setTimeout(typeWriter, 1000);
});

// 星空效果 - 同时应用于Hero区域和下载区域
document.addEventListener('DOMContentLoaded', function () {
    // 创建星星移动函数
    function createStar(container, initial = false) {
        const star = document.createElement('div');
        star.classList.add('star');

        // 随机大小
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // 确保星星有明显的背景色，防止不可见
        star.style.backgroundColor = '#fff';

        let leftPos, topPos;

        if (initial) {
            // 初始星星：在整个区域随机位置
            leftPos = Math.random() * 100;
            topPos = Math.random() * 100;
        } else {
            // 新星星：从顶部或右侧进入，都往左下方向移动
            const enterFromTop = Math.random() > 0.5; // 50%从顶部进入，50%从右侧进入
            if (enterFromTop) {
                leftPos = Math.random() * 100; // 0%-100%宽度 - 确保顶部进入的星星分布均匀
                topPos = -5; // 从顶部外进入
            } else {
                leftPos = 105; // 从右侧进入
                topPos = Math.random() * 100; // 0%-100%高度 - 确保右侧进入的星星分布均匀
            }
        }

        star.style.left = `${leftPos}%`;
        star.style.top = `${topPos}%`;

        // 随机不透明度 - 确保不透明度足够高以可见
        star.style.opacity = Math.random() * 0.5 + 0.5; // 0.5-1.0之间

        // 判断是否为高速移动的流星
        const isMeteor = !initial && Math.random() < 0.1; // 10%的概率是流星

        if (isMeteor) {
            // 流星设置
            star.classList.add('meteor');
            star.style.width = `${Math.random() * 0}px`; // 流星长度0px
            star.style.height = '2px'; // 流星宽度
            star.style.backgroundColor = '#fff';
            star.style.borderRadius = '0'; // 直线形状

            // 添加长拖影效果
            const blurSize = Math.random() * 10 + 5;
            star.style.boxShadow = `0 0 ${blurSize}px ${blurSize / 2}px rgba(255, 255, 255, 0.8), 0 0 ${blurSize * 2}px ${blurSize}px rgba(255, 255, 255, 0.4)`;

            // 流星移动速度 - 减慢二分之一
            const meteorDuration = Math.random() * 1 + 1.4; // 0.4-1.4秒移动（原速度的二分之一）

            // 极大增加移动距离，确保流星划过整个屏幕
            const translateX = -1 * (Math.random() * 500 + 800); // 向左移动800-1300px
            const translateY = Math.random() * 500 + 800; // 向下移动800-1300px

            // 创建唯一动画ID
            const starId = `meteor-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

            // 创建动画样式 - 流星快速移动和消失效果
            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                @keyframes move-${starId} {
                    0% { transform: translate(0, 0); opacity: 0; }
                    10% { transform: translate(${translateX * 0.1}px, ${translateY * 0.1}px); opacity: 1; }
                    90% { transform: translate(${translateX * 0.9}px, ${translateY * 0.9}px); opacity: 1; }
                    100% { transform: translate(${translateX}px, ${translateY}px); opacity: 0; }
                }
                #${starId} {
                    animation: move-${starId} ${meteorDuration}s linear forwards !important;
                }
            `;
            document.head.appendChild(styleSheet);

            // 设置ID
            star.id = starId;

            // 添加到容器
            container.appendChild(star);

            // 流星移出屏幕后移除
            setTimeout(() => {
                if (star.parentNode) {
                    setTimeout(() => {
                        if (star.parentNode) {
                            star.remove();
                            styleSheet.remove();
                        }
                    }, 200);
                }
            }, meteorDuration * 1000);
        } else {
            // 普通星星的设置
            // 根据大小设置速度：星星越小速度越快
            const baseDuration = initial ? Math.random() * 50 + 30 : Math.random() * 100 + 20;
            const duration = (1 / size) * baseDuration; // 小星星速度更快

            // 增加移动距离，确保星星能完全到达边界
            const translateX = -1 * (Math.random() * 600 + 800); // 向左移动800-1400px
            const translateY = Math.random() * 600 + 800; // 向下移动800-1400px

            // 创建唯一动画ID
            const starId = `star-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

            // 增加闪烁效果的星星比例 - 90%的星星会闪烁，不分大小
            const shouldFlash = Math.random() > 0.1;
            const flashDuration = Math.random() * 1; // 加快闪烁速度：1秒

            // 小星星闪烁更亮：星星越小，闪烁时的不透明度增加越多
            const flashFactor = 2.5 - (size / 4); // 小星星有更大的闪烁系数
            const maxFlashOpacity = Math.min(parseFloat(star.style.opacity) * flashFactor, 1);

            let animationRule = '';
            if (shouldFlash) {
                animationRule = `
                    @keyframes flash-${starId} {
                        0%, 100% { opacity: ${star.style.opacity}; }
                        50% { opacity: ${maxFlashOpacity}; }
                    }
                    #${starId} {
                        animation: move-${starId} ${duration}s linear forwards, flash-${starId} ${flashDuration}s ease-in-out infinite !important;
                    }
                `;
            } else {
                animationRule = `
                    #${starId} {
                        animation: move-${starId} ${duration}s linear forwards !important;
                    }
                `;
            }

            // 创建动画样式 - 确保星星完全到达边界才消失
            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                @keyframes move-${starId} {
                    0% { transform: translate(0, 0); opacity: ${star.style.opacity}; }
                    100% { transform: translate(${translateX}px, ${translateY}px); opacity: 0; }
                }
                ${animationRule}
            `;
            document.head.appendChild(styleSheet);

            // 设置ID
            star.id = starId;

            // 添加到容器
            container.appendChild(star);

            // 增加延迟时间，确保星星完全移出屏幕后再移除
            setTimeout(() => {
                if (star.parentNode) {
                    setTimeout(() => {
                        if (star.parentNode) {
                            star.remove();
                            styleSheet.remove();
                        }
                    }, 500); // 增加延迟时间到500ms
                }
            }, duration * 1000);
        }
    }

    // 初始化星空背景的函数
    function initStarBackground(containerSelector) {
        const container = document.querySelector(containerSelector);

        if (container) {
            console.log('星空背景已找到，开始创建星星...');

            // 生成初始星星 - 立即在整个区域随机位置生成100颗
            for (let i = 0; i < 100; i++) {
                createStar(container, true);
            }

            // 定期创建新星星 - 保持区域内有足够的星星
            setInterval(() => createStar(container, false), 150);
        }
    }

    // 初始化Hero区域和下载区域的星空背景
    initStarBackground('.starry-bg');
    initStarBackground('#download-footer .starry-bg');
});

// 平滑滚动
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

});