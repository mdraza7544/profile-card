
// Get all elements
const followBtn = document.querySelector('.button:first-child');
const messageBtn = document.querySelector('.button:last-child');
const socialLinks = document.querySelectorAll('.media-button .link');
const heartIcon = document.querySelector('.bx-heart');
const heartNumber = heartIcon.nextElementSibling;
const messageIcon = document.querySelector('.bx-message-rounded');
const messageNumber = messageIcon.nextElementSibling;
const shareIcon = document.querySelector('.bx-share');
const shareNumber = shareIcon.nextElementSibling;

// Follow button functionality
let isFollowing = false;
followBtn.addEventListener('click', function () {
    isFollowing = !isFollowing;
    if (isFollowing) {
        this.textContent = 'Following';
        this.classList.add('following');
        alert('You are now following Thor!');
    } else {
        this.textContent = 'Follow';
        this.classList.remove('following');
        alert('You unfollowed Thor!');
    }
});

messageBtn.addEventListener('click', () => {
    window.location.href =
        "mailto:mdashifraza222@gmail.com?subject=Message from Portfolio&body=Hi Md Ashif,";
});

// Social media links
socialLinks.forEach(link => {
    link.addEventListener('click', function () {
        const url = this.getAttribute('href');
        window.open(url, '_blank'); // new tab
    });
});


// Heart/Like functionality
let isLiked = false;
heartIcon.parentElement.addEventListener('click', function () {
    isLiked = !isLiked;
    let currentLikes = parseInt(heartNumber.textContent);

    if (isLiked) {
        heartNumber.textContent = currentLikes + 1;
        heartIcon.style.color = '#e74c3c';
        heartIcon.classList.add('bxs-heart');
        heartIcon.classList.remove('bx-heart');
    } else {
        heartNumber.textContent = currentLikes - 1;
        heartIcon.style.color = '#667eea';
        heartIcon.classList.add('bx-heart');
        heartIcon.classList.remove('bxs-heart');
    }

    this.classList.add('pulse');
    setTimeout(() => this.classList.remove('pulse'), 300);
});
















// Comment section functionality
const commentModal = document.getElementById('commentModal');
const closeModal = document.getElementById('closeModal');
const commentInput = document.getElementById('commentInput');
const addCommentBtn = document.getElementById('addCommentBtn');
const commentsList = document.getElementById('commentsList');

// Array to store comments
let comments = [];

// Open comment modal when clicking message icon
messageIcon.parentElement.addEventListener('click', function () {
    commentModal.classList.add('active');
    this.classList.add('pulse');
    setTimeout(() => this.classList.remove('pulse'), 300);
});

// Close modal
closeModal.addEventListener('click', function () {
    commentModal.classList.remove('active');
});

// Close modal when clicking outside
commentModal.addEventListener('click', function (e) {
    if (e.target === commentModal) {
        commentModal.classList.remove('active');
    }
});

// Function to add comment
function addComment() {
    const commentText = commentInput.value.trim();

    if (commentText === '') {
        alert('Please write a comment first!');
        return;
    }

    // Create comment object
    const comment = {
        id: Date.now(),
        author: 'User',
        text: commentText,
        time: new Date().toLocaleString()
    };

    // Add to comments array
    comments.unshift(comment);

    // Update comment counter
    messageNumber.textContent = comments.length;

    // Display comments
    displayComments();

    // Clear input
    commentInput.value = '';
}

// Add comment on button click
addCommentBtn.addEventListener('click', addComment);

// Add comment on Enter key press
commentInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addComment();
    }
});

// Function to display comments
function displayComments() {
    if (comments.length === 0) {
        commentsList.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
        return;
    }

    let commentsHTML = '';
    comments.forEach(comment => {
        commentsHTML += `
                    <div class="comment-item">
                        <div class="comment-author">${comment.author}</div>
                        <div class="comment-text">${comment.text}</div>
                        <div class="comment-time">${comment.time}</div>
                    </div>
                `;
    });

    commentsList.innerHTML = commentsHTML;
}
































// Share functionality
const shareModal = document.getElementById('shareModal');
const closeShareModal = document.getElementById('closeShareModal');
const shareOptions = document.querySelectorAll('.share-option');
const copyLinkBtn = document.getElementById('copyLinkBtn');
const shareLinkText = document.getElementById('shareLinkText');

// Profile URL for sharing
const profileUrl = window.location.href;
const profileTitle = 'Check out Thor\'s Profile!';
const profileDescription = 'Thor - Web Automation Learner';

// Set the link text
shareLinkText.textContent = profileUrl;

// Open share modal when clicking share icon
shareIcon.parentElement.addEventListener('click', function () {
    shareModal.classList.add('active');
    this.classList.add('pulse');
    setTimeout(() => this.classList.remove('pulse'), 300);
});

// Close share modal
closeShareModal.addEventListener('click', function () {
    shareModal.classList.remove('active');
});

// Close modal when clicking outside
shareModal.addEventListener('click', function (e) {
    if (e.target === shareModal) {
        shareModal.classList.remove('active');
    }
});

// Copy link button
copyLinkBtn.addEventListener('click', function () {
    copyToClipboard(profileUrl);

    // Increase share counter
    let currentShares = parseInt(shareNumber.textContent);
    shareNumber.textContent = currentShares + 1;

    this.textContent = 'Copied!';
    setTimeout(() => {
        this.textContent = 'Copy';
    }, 2000);
});

// Handle share options
shareOptions.forEach(option => {
    option.addEventListener('click', function () {
        const platform = this.getAttribute('data-platform');

        // Increase share counter
        let currentShares = parseInt(shareNumber.textContent);
        shareNumber.textContent = currentShares + 1;

        switch (platform) {
            case 'email':
                window.location.href = `mailto:?subject=${encodeURIComponent(profileTitle)}&body=${encodeURIComponent(profileDescription + '\n\n' + profileUrl)}`;
                break;

            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(profileTitle + '\n' + profileUrl)}`, '_blank');
                break;

            case 'instagram':
                alert('Instagram sharing requires their mobile app. Link copied to clipboard!');
                copyToClipboard(profileUrl);
                break;

            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`, '_blank');
                break;

            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(profileTitle)}&url=${encodeURIComponent(profileUrl)}`, '_blank');
                break;

            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`, '_blank');
                break;

            case 'messenger':
                window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(profileUrl)}&app_id=`, '_blank');
                break;

            case 'telegram':
                window.open(`https://t.me/share/url?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(profileTitle)}`, '_blank');
                break;
        }

        shareModal.classList.remove('active');
    });
});

// Copy to clipboard function
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Profile image click
const profileImg = document.querySelector('.profile-img');
profileImg.addEventListener('click', function () {
    alert('Profile picture clicked!');
});

// Hover effect for analytics
const analyticsData = document.querySelectorAll('.analyatics .data');
analyticsData.forEach(data => {
    data.style.cursor = 'pointer';
    data.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s';
    });
    data.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });
});