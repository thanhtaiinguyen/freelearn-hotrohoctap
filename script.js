document.addEventListener('DOMContentLoaded', function () {
    // Navbar Toggle for Mobile
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    navbarToggle.addEventListener('click', function () {
        navbarMenu.classList.toggle('active');
        const icon = navbarToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Navigation Items
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const navbarBrand = document.querySelector('.navbar-brand');
    const toolLinks = document.querySelectorAll('.tool-link');

    function setActiveSection(targetId) {
        navItems.forEach(item => item.classList.remove('active'));
        contentSections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        const targetNav = document.querySelector(`.nav-item[data-target="${targetId}"]`);
        const targetSection = document.getElementById(targetId);

        if (targetNav && targetSection) {
            targetNav.classList.add('active');
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
        }

        if (window.innerWidth <= 768) {
            navbarMenu.classList.remove('active');
            const icon = navbarToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            setActiveSection(targetId);
            if (targetId === 'quiz') {
                startQuiz();
            } else {
                stopTimer();
            }
        });
    });

    navbarBrand.addEventListener('click', function () {
        setActiveSection('home');
    });

    toolLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            setActiveSection(targetId);
            if (targetId === 'quiz') {
                startQuiz();
            } else {
                stopTimer();
            }
        });
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.toggle('fa-sun');
        icon.classList.toggle('fa-moon');
    });

    // User Profile Dropdown
    const userProfile = document.getElementById('userProfile');
    const userDropdown = document.getElementById('userDropdown');

    userProfile.addEventListener('click', function (e) {
        e.stopPropagation();
        userDropdown.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
        if (!userProfile.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });

    userDropdown.querySelectorAll('.user-menu-item').forEach(item => {
        item.addEventListener('click', function () {
            const action = this.getAttribute('data-action');
            alert(`Selected action: ${action}`);
            userDropdown.classList.remove('active');
        });
    });

    // Chat Widget
    const chatToggle = document.getElementById('chatToggle');
    const chatBox = document.getElementById('chatBox');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');

    chatToggle.addEventListener('click', function () {
        chatBox.classList.toggle('active');
    });

    chatClose.addEventListener('click', function () {
        chatBox.classList.remove('active');
    });

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText) {
            const userMessage = document.createElement('div');
            userMessage.classList.add('message', 'user-message');
            userMessage.textContent = messageText;
            chatMessages.appendChild(userMessage);

            setTimeout(() => {
                const botMessage = document.createElement('div');
                botMessage.classList.add('message', 'bot-message');
                botMessage.textContent = `Thanks for your question! I'm here to help. Can you provide more details about "${messageText}"?`;
                chatMessages.appendChild(botMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);

            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Quiz Timer
    const quizTimer = document.querySelector('.quiz-timer span');
    let timeLeft = 15 * 60;
    let timerInterval;

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        quizTimer.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showResults();
        }
        timeLeft--;
    }

    function startTimer() {
        if (!timerInterval) {
            timerInterval = setInterval(updateTimer, 1000);
        }
    }

    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    // Code Upload
    const codeUpload = document.getElementById('codeUpload');
    codeUpload.addEventListener('change', function (e) {
        const files = e.target.files;
        for (let file of files) {
            alert(`Đã tải lên tệp: ${file.name}`);
        }
    });

    // Filter Tags
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        tag.addEventListener('click', function () {
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const filter = this.textContent;
            alert(`Lọc theo: ${filter}`);
        });
    });

    // Code Actions
    const codeActions = document.querySelectorAll('.code-action');
    codeActions.forEach(action => {
        action.addEventListener('click', function () {
            if (this.querySelector('i').classList.contains('fa-heart')) {
                const likeCount = this.querySelector('span');
                let count = parseInt(likeCount.textContent);
                if (this.querySelector('i').classList.contains('far')) {
                    this.querySelector('i').classList.replace('far', 'fas');
                    likeCount.textContent = count + 1;
                } else {
                    this.querySelector('i').classList.replace('fas', 'far');
                    likeCount.textContent = count - 1;
                }
            } else {
                const icon = this.querySelector('i');
                if (icon.classList.contains('far')) {
                    icon.classList.replace('far', 'fas');
                } else {
                    icon.classList.replace('fas', 'far');
                }
                alert('Đã lưu mã!');
            }
        });
    });

    // Quiz Logic
    const quizQuestions = [
        {
            question: "HTML là viết tắt của gì?",
            options: { a: "Ngôn ngữ Đánh dấu Siêu văn bản", b: "Công cụ Đánh dấu Siêu văn bản", c: "Ngôn ngữ Tạo Siêu văn bản", d: "Ngôn ngữ Đánh dấu Markdown" },
            correct: "a",
            explanation: "HTML là viết tắt của HyperText Markup Language, dùng để tạo cấu trúc cho các trang web.",
            topic: "HTML Basics"
        },
        {
            question: "Thẻ HTML nào được dùng để định nghĩa danh sách không có thứ tự?",
            options: { a: "<ol>", b: "<ul>", c: "<li>", d: "<list>" },
            correct: "b",
            explanation: "Thẻ <ul> (unordered list) tạo danh sách không có thứ tự, các mục được đánh dấu bằng dấu đầu dòng.",
            topic: "HTML Lists"
        },
        {
            question: "Thẻ <meta> trong HTML có mục đích gì?",
            options: { a: "Định nghĩa một đoạn văn", b: "Cung cấp siêu dữ liệu về tài liệu", c: "Tạo một liên kết", d: "Chèn một hình ảnh" },
            correct: "b",
            explanation: "Thẻ <meta> chứa thông tin siêu dữ liệu như mã hóa ký tự, mô tả trang hoặc từ khóa cho SEO.",
            topic: "HTML Metadata"
        },
        {
            question: "CSS là viết tắt của gì?",
            options: { a: "Bảng kiểu Sáng tạo", b: "Bảng kiểu Xếp tầng", c: "Bảng kiểu Máy tính", d: "Bảng kiểu Màu sắc" },
            correct: "b",
            explanation: "CSS là viết tắt của Cascading Style Sheets, dùng để định dạng giao diện trang web.",
            topic: "CSS Basics"
        },
        {
            question: "Thuộc tính CSS nào điều khiển kích thước văn bản?",
            options: { a: "font-size", b: "text-size", c: "size", d: "font-style" },
            correct: "a",
            explanation: "Thuộc tính font-size điều chỉnh kích thước chữ trong CSS.",
            topic: "CSS Text"
        },
        {
            question: "NaN trong JavaScript là viết tắt của gì?",
            options: { a: "Không phải là số", b: "Giá trị rỗng và không có", c: "Không phải là rỗng", d: "Số và rỗng" },
            correct: "a",
            explanation: "NaN là giá trị đặc biệt trong JavaScript, biểu thị một giá trị không phải số.",
            topic: "JavaScript Basics"
        },
        {
            question: "Phương thức nào được dùng để thêm một phần tử vào cuối mảng trong JavaScript?",
            options: { a: "push()", b: "pop()", c: "shift()", d: "unshift()" },
            correct: "a",
            explanation: "Phương thức push() thêm một phần tử vào cuối mảng.",
            topic: "JavaScript Arrays"
        }
    ];

    let shuffledQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    const wrongTopics = new Set();
    const userAnswers = [];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startQuiz() {
        shuffledQuestions = shuffleArray([...quizQuestions]);
        currentQuestionIndex = 0;
        score = 0;
        wrongTopics.clear();
        userAnswers.length = 0;
        timeLeft = 15 * 60; // Reset timer
        quizTimer.textContent = "15:00"; // Reset hiển thị timer
        displayQuestion();
        startTimer();
    }

    function displayQuestion() {
        const quizContainer = document.querySelector('.quiz-container');
        if (!quizContainer) return;

        quizContainer.innerHTML = '';

        if (currentQuestionIndex >= shuffledQuestions.length) {
            showResults();
            return;
        }

        const questionData = shuffledQuestions[currentQuestionIndex];
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('quiz-question', 'active');

        const questionTitle = document.createElement('h3');
        questionTitle.textContent = questionData.question;
        questionDiv.appendChild(questionTitle);

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('quiz-options');
        const options = Object.entries(questionData.options);
        shuffleArray(options).forEach(([key, value]) => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('quiz-option');
            optionDiv.dataset.option = key;
            optionDiv.textContent = value;
            optionsDiv.appendChild(optionDiv);
        });
        questionDiv.appendChild(optionsDiv);

        quizContainer.appendChild(questionDiv);

        document.getElementById('quiz-progress').textContent = `Câu Hỏi ${currentQuestionIndex + 1}/${shuffledQuestions.length}`;

        const quizOptions = questionDiv.querySelectorAll('.quiz-option');
        quizOptions.forEach(option => {
            option.addEventListener('click', function () {
                quizOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');

                const selectedOption = this.dataset.option;
                userAnswers[currentQuestionIndex] = {
                    selected: selectedOption,
                    correct: questionData.correct,
                    topic: questionData.topic
                };

                if (selectedOption === questionData.correct) {
                    score++;
                } else {
                    wrongTopics.add(questionData.topic);
                }

                setTimeout(nextQuestion, 500);
                quizOptions.forEach(opt => opt.style.pointerEvents = 'none');
            });
        });
    }

    function nextQuestion() {
        currentQuestionIndex++;
        displayQuestion();
    }

    function showResults() {
        stopTimer();
        const quizContainer = document.querySelector('.quiz-container');
        quizContainer.innerHTML = '';

        const resultDiv = document.createElement('div');
        resultDiv.classList.add('quiz-result');

        const totalQuestions = shuffledQuestions.length;
        const wrongCount = totalQuestions - score;

        resultDiv.innerHTML = `
            <h2>Kết Quả Bài Kiểm Tra</h2>
            <p>Số câu đúng: ${score}/${totalQuestions}</p>
            <p>Số câu sai: ${wrongCount}</p>
            <h3>Kiến thức cần ôn lại:</h3>
            <ul>
                ${wrongTopics.size > 0 ? Array.from(wrongTopics).map(topic => `<li>${topic}</li>`).join('') : '<li>Không có! Bạn đã làm rất tốt!</li>'}
            </ul>
            <button class="btn btn-primary" id="backToHomeButton">Quay Về Trang Chủ</button>
        `;
        quizContainer.appendChild(resultDiv);

        // Thêm sự kiện cho nút "Quay Về Trang Chủ"
        const backToHomeButton = document.getElementById('backToHomeButton');
        backToHomeButton.addEventListener('click', function () {
            setActiveSection('home');
        });
    }

    // Document Download
    const downloadButtons = document.querySelectorAll('.document-download, .btn-blue[download], .btn-green[download], .btn-purple[download]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function () {
            alert('Download started. Your file will be saved to your downloads folder.');
        });
    });
});