let timer;
let timeLeft;
let currentPart = 1;
let isTimerRunning = false;
let audioElement = null;
let examStarted = false;
let currentExamType = null; // 'c1' or 'b2'

const c1ExamScript = {
    1: {
        title: "Speaking Part One: Interview",
        instructions: "Greetings. My name is Claire. Can I have your mark sheets please? Thank you. What are your names?",
        duration: 10
    },
    2: {
        title: "Question 1",
        instructions: "Candidate A, Where are you from?",
        duration: 10
    },
    3: {
        title: "Question 2",
        instructions: "And you, Candidate B?",
        duration: 10
    },
    4: {
        title: "Question 3",
        instructions: "Candidate A, what do you find beautiful about where you live?",
        duration: 20
    },
    5: {
        title: "Question 4",
        instructions: "Candidate B, has your idea of beauty changed as you've grown older?",
        duration: 20
    },
    6: {
        title: "Question 5",
        instructions: "Candidate A, what makes something beautiful to you?",
        duration: 20
    },
    7: {
        title: "Question 6",
        instructions: "Candidate B, Do you think beautiful things are always expensive?",
        duration: 20
    },
    8: {
        title: "Speaking Part Two: Long Turn",
        instructions: "In this part of the test, I'm going to give each of you three photographs. I'd like you to talk about two of them on your own for about a minute, and also to answer a question briefly about your partner's photographs. Candidate A, it's your turn first. Here are your photographs. They show different interpretations of beauty in nature. I'd like you to compare two of the photographs, and say why people might find these scenes beautiful, and what effect they might have on people.",
        duration: 60
    },
    9: {
        title: "turn 2",
        instructions: "Thank you. (Candidate B), which of these natural settings would you find most inspiring? Why?",
        duration: 30
    },
    10: {
        title: "Question 7",
        instructions: "Now, Candidate B, here are your photographs. They show different ways people create or interact with beauty. I'd like you to compare two of the photographs, and say what these people might get from these experiences, and why they might value them.",
        duration: 60
    },
    11: {
        title: "Question 8",
        instructions: "Thank you. (Candidate A), which of these ways of experiencing beauty appeals to you most? Why?",
        duration: 30
    },
    12: {
        title: "Speaking Part Three: Collaborative Task",
        instructions: "Now, I'd like you to talk about something together for about two minutes. Here are some ways that beauty might influence our lives. Talk to each other about how these different aspects might affect people's wellbeing and behaviour.",
        duration: 120
    },
    13: {
        title: "Question 10",
        instructions: "Now, you have about a minute to decide which two aspects have the greatest impact on people's dailylives.",
        duration: 60
    },
    14: {
        title: "Speaking Part Four Discussion",
        instructions: "Now, to finish the test, you are going to discuss about beauty in general. How have social media and filters changed our perception of beauty? ",
        duration: 60
    },
    15: {
        title: "Question 11",
        instructions: "Is there such a thing as universal beauty?",
        duration: 60
    },
    16: {
        title: "Question 12",
        instructions: "Has modern life made us less appreciative of beauty?",
        duration: 60
    },
    17: {
        title: "Question 13",
        instructions: "Should aesthetic appreciation be part of education?",
        duration: 60
    },
    18: {
        title: "Test Complete",
        instructions: "Thank you, the test is over.",
        duration: 0
    }
};

const b2ExamScript = {
    1: {
        title: "Speaking Part One: Interview",
        instructions: "Greetings. My name is Claire. Can I have your mark sheets please? Thank you. What are your names?",
        duration: 10
    },
    2: {
        title: "Question 1",
        instructions: "Candidate A, Where are you from?",
        duration: 10
    },
    3: {
        title: "Question 2",
        instructions: "And you, Candidate B?",
        duration: 10
    },
    4: {
        title: "Question 3",
        instructions: "Candidate A, Is there an interesting area of your country that you would like to visit?",
        duration: 20
    },
    5: {
        title: "Question 4",
        instructions: "Candidate B, Do you use the internet to study English?",
        duration: 20
    },
    6: {
        title: "Question 5",
        instructions: "Candidate A, What's your favourite food?",
        duration: 20
    },
    7: {
        title: "Question 6",
        instructions: "Candidate B, Are you planning to do anything special this weekend?",
        duration: 20
    },
    8: {
        title: "Speaking Part Two: Long Turn",
        instructions: "In this part of the test, I'm going to give each of you two photographs. I'd like you to talk about your photographson your own for about a minute, and also to answer a question about your partner's photographs. Candidate A, it's your turn first. Here are your photographs. They show people studying in different places. I'd like you to compare the photographs, and say what are the advantages and disadvantages of studying in each place.",
        duration: 60
    },
    9: {
        title: "turn 2",
        instructions: "Thank you. (Candidate B), where would you prefer to study?",
        duration: 30
    },
    10: {
        title: "Question 7",
        instructions: "Now, Candidate B, here are your photographs. They show different places you can have a meal. I'd like you to compare the photographs, and say why people might enjoy having a meal in each place.",
        duration: 60
    },
    11: {
        title: "Question 8",
        instructions: "Thank you. (Candidate A), where would you prefer to have a meal?",
        duration: 30
    },
    12: {
        title: "Speaking Part Three: Collaborative Task",
        instructions: "Now, I'd like you to talk about something together for about two minutes. I'd like you to imagine some different problems a family can face while on holiday. Here are some different ideas. First, you have some time to look at the task. Now talk to each other about what particular problems could be caused by each of these situations.",
        duration: 120
    },
    13: {
        title: "Question 10",
        instructions: "Now, you have about a minute to decide which of these is the most serious problem.",
        duration: 60
    },
    14: {
        title: "Speaking Part Four: Discussion",
        instructions: "Now, to finish the test, you are going to discuss together some topics. Do you prefer to go on holiday abroad or in your own country?",
        duration: 80
    },
    15: {
        title: "Question 11",
        instructions: "What, to you, is the difference between a traveller and a tourist?",
        duration: 80
    },
    16: {
        title: "Question 12",
        instructions: "Does a town or region always benefit from tourism?",
        duration: 80
    },
    18: {
        title: "Test Complete",
        instructions: "Thank you, the test is over.",
        duration: 0
    }
};

function startExam(examType) {
    currentExamType = examType;
    document.getElementById('welcome-section').style.display = 'none';
    document.getElementById('exam-section').style.display = 'block';
    examStarted = true;
    loadPart(1);
}

function finishExam() {
    // Stop any ongoing processes
    stopTimer();
    if (audioElement) {
        audioElement.pause();
        URL.revokeObjectURL(audioElement.src);
        audioElement = null;
    }

    // Reset variables
    currentPart = 1;
    examStarted = false;
    
    // Reset display
    document.getElementById('welcome-section').style.display = 'block';
    document.getElementById('exam-section').style.display = 'none';
    document.getElementById('currentPart').textContent = '1';
    document.getElementById('instructions').textContent = '';
    document.getElementById('imageContainer').style.display = 'none';
    document.getElementById('imageContainer2').style.display = 'none';
    document.getElementById('imageContainer3').style.display = 'none';
    document.getElementById('characterContainer').classList.remove('character-talking');
    
    // Reset timer display
    timeLeft = 120;
    updateTimerDisplay();
}

function startTimer() {
    if (isTimerRunning) return;
    
    isTimerRunning = true;
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            stopTimer();
            // Automatically move to next part when timer reaches zero
            nextQuestion();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    isTimerRunning = false;
}

function resetTimer(seconds) {
    stopTimer();
    timeLeft = seconds;
    updateTimerDisplay();
}

function resetCurrentTimer() {
    const examScript = currentExamType === 'c1' ? c1ExamScript : b2ExamScript;
    const currentPart = examScript[document.getElementById('currentPart').textContent];
    if (currentPart) {
        resetTimer(currentPart.duration);
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

async function speakText(text) {
    try {
        console.log('Speaking text:', text);  // Debug log
        
        const response = await fetch('/get_speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        if (audioElement) {
            audioElement.pause();
            URL.revokeObjectURL(audioElement.src);  // Clean up old URL
            audioElement.remove();
        }

        audioElement = new Audio(audioUrl);
        
        // Add event listeners for debugging and auto-start timer
        audioElement.addEventListener('play', () => {
            console.log('Audio started playing');
            // Stop timer if it's running while audio starts
            stopTimer();
            // Start character animation
            document.getElementById('characterContainer').classList.add('character-talking');
        });
        
        audioElement.addEventListener('error', (e) => console.error('Audio error:', e));
        
        audioElement.addEventListener('ended', () => {
            console.log('Audio finished playing');
            // Auto-start timer when audio ends
            startTimer();
            // Stop character animation
            document.getElementById('characterContainer').classList.remove('character-talking');
        });

        console.log('Playing audio...');
        await audioElement.play();

    } catch (error) {
        console.error('Error with text-to-speech:', error);
    }
}

function loadPart(partNumber) {
    const examScript = currentExamType === 'c1' ? c1ExamScript : b2ExamScript;
    const part = examScript[partNumber];
    if (!part) return;

    // Set the instructions text content but keep it hidden by default
    document.getElementById('instructions').textContent = part.instructions;
    document.getElementById('instructions').style.display = 'none';
    // Reset the Show Text button text
    document.getElementById('showText').textContent = 'Show Text';
    document.getElementById('currentPart').textContent = partNumber;
    resetTimer(part.duration);

    // Show/hide images based on part number and exam type
    const imageContainer = document.getElementById('imageContainer');
    const imageContainer2 = document.getElementById('imageContainer2');
    const imageContainer3 = document.getElementById('imageContainer3');
    
    // Hide all containers by default
    imageContainer.style.display = 'none';
    imageContainer2.style.display = 'none';
    imageContainer3.style.display = 'none';
    
    // Show appropriate container based on part number and exam type
    if (currentExamType === 'b2' && (partNumber === 8 || partNumber === 9)) {
        imageContainer.style.display = 'block';
        // Update image sources for B2 exam
        const images = imageContainer.querySelectorAll('.exam-image');
        images[0].src = '/static/images/im8.png';
        images[1].src = '/static/images/im9.png';
        images[2].style.display = 'none'; // Hide the third image for B2
    } else if (currentExamType === 'c1' && (partNumber === 8 || partNumber === 9)) {
        imageContainer.style.display = 'block';
        // Reset image sources for C1 exam
        const images = imageContainer.querySelectorAll('.exam-image');
        images[0].src = '/static/images/im1.png';
        images[1].src = '/static/images/im2.png';
        images[2].src = '/static/images/im3.png';
        images[2].style.display = 'block'; // Show the third image for C1
    } else if (currentExamType === 'b2' && (partNumber === 10 || partNumber === 11)) {
        imageContainer2.style.display = 'block';
        // Update image sources for B2 exam
        const images = imageContainer2.querySelectorAll('.exam-image');
        images[0].src = '/static/images/im10.png';
        images[1].src = '/static/images/im11.png';
        images[2].style.display = 'none'; // Hide the third image for B2
    } else if (currentExamType === 'c1' && (partNumber === 10 || partNumber === 11)) {
        imageContainer2.style.display = 'block';
        // Reset image sources for C1 exam
        const images = imageContainer2.querySelectorAll('.exam-image');
        images[0].src = '/static/images/im4.png';
        images[1].src = '/static/images/im5.png';
        images[2].src = '/static/images/im6.png';
        images[2].style.display = 'block'; // Show the third image for C1
    } else if (currentExamType === 'b2' && (partNumber === 12 || partNumber === 13)) {
        imageContainer3.style.display = 'block';
        // Update image source for B2 exam
        const image = imageContainer3.querySelector('.exam-image');
        image.src = '/static/images/im12.png';
    } else if (currentExamType === 'c1' && (partNumber === 12 || partNumber === 13)) {
        imageContainer3.style.display = 'block';
        // Reset image source for C1 exam
        const image = imageContainer3.querySelector('.exam-image');
        image.src = '/static/images/im7.png';
    }

    // Show/hide finish button and timer elements based on part number
    const finishButton = document.getElementById('finishExam');
    const timerSection = document.querySelector('.timer-section');
    const timerControls = document.querySelector('.timer-controls');
    
    if (partNumber === 18) {
        finishButton.style.display = 'block';
        timerSection.style.display = 'none';
        timerControls.style.display = 'none';
    } else {
        finishButton.style.display = 'none';
        timerSection.style.display = 'block';
        timerControls.style.display = 'flex';
    }

    // Only speak text if exam has started
    if (examStarted) {
        speakText(part.instructions);
    }
}

function nextQuestion() {
    stopTimer();
    if (audioElement) {
        audioElement.pause();
        URL.revokeObjectURL(audioElement.src);  // Clean up old URL
        audioElement = null;
    }
    currentPart++;
    if (currentPart > 18) {  // Updated to match new total number of parts
        // If we've finished the last part, finish the exam
        finishExam();
        return;
    }
    loadPart(currentPart);
}

// Event Listeners
document.getElementById('startC1Exam').addEventListener('click', () => startExam('c1'));
document.getElementById('startB2Exam').addEventListener('click', () => startExam('b2'));
document.getElementById('startTimer').addEventListener('click', startTimer);
document.getElementById('stopTimer').addEventListener('click', stopTimer);
document.getElementById('resetTimer').addEventListener('click', resetCurrentTimer);
document.getElementById('nextQuestion').addEventListener('click', nextQuestion);
document.getElementById('finishExam').addEventListener('click', finishExam);

// Add event listener for show text button
document.getElementById('showText').addEventListener('click', function() {
    const instructions = document.getElementById('instructions');
    if (instructions.style.display === 'none') {
        instructions.style.display = 'block';
        this.textContent = 'Hide Text';
    } else {
        instructions.style.display = 'none';
        this.textContent = 'Show Text';
    }
});

// Initialize the page
document.getElementById('exam-section').style.display = 'none';
document.getElementById('welcome-section').style.display = 'block'; 