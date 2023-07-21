function generatePasswordSuggestion() {
    var words = ['apple', 'orange', 'banana', 'strawberry', 'grape', 'pineapple', 'mango', 'blueberry', 'pomegranate', 'coconut'];
    var symbols = '!@#$%^&*()';
    var newPassword = "";

    for (var i = 0; i < 2; i++) {
        var randomWord = words[Math.floor(Math.random() * words.length)];
        newPassword += randomWord.charAt(0).toUpperCase() + randomWord.slice(1);
    }

    newPassword += Math.floor(Math.random() * 10);
    newPassword += symbols[Math.floor(Math.random() * symbols.length)];

    return newPassword;
}

document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var password = document.getElementById('password').value;
    
    var result = zxcvbn(password);
    
    var output = '<div class="output-header">Password Strength Report</div>';
    output += '<div class="output-subheader">Strength Score</div><div class="output-content">' + result.score + ' (0 = weak, 4 = strong)</div>';
    output += '<div class="output-subheader">Estimated Crack Time (Fast Offline Attack)</div><div class="output-content">' + result.crack_times_display.offline_fast_hashing_1e10_per_second + '</div>';
    output += '<div class="output-subheader">Warning(s)</div><div class="output-content">' + (result.feedback.warning || 'None') + '</div>';
    output += '<div class="output-subheader">Suggestion(s)</div><div class="output-content">' + (result.feedback.suggestions.join(', ') || 'None') + '</div>';
    
    var passwordSuggestion = generatePasswordSuggestion();
    output += '<div class="output-subheader">Password Suggestion</div><div class="output-content">' + passwordSuggestion + '</div>';
    
    document.getElementById('output').innerHTML = output;
});

document.getElementById('show-password-checkbox').addEventListener('change', function(event) {
    var passwordField = document.getElementById('password');
    
    if (event.target.checked) {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
});
