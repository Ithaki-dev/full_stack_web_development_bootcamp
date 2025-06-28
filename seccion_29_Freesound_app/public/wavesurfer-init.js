// Wavesurfer.js initialization and controls
document.addEventListener('DOMContentLoaded', function() {
    const waveforms = [];
    const audioUrls = document.querySelectorAll('.audio-url');
    
    // Initialize Wavesurfer for each audio
    audioUrls.forEach((urlInput, index) => {
        const audioUrl = urlInput.value;
        const containerId = `waveform-${index}`;
        
        // Create Wavesurfer instance
        const wavesurfer = WaveSurfer.create({
            container: `#${containerId}`,
            waveColor: '#00ffff',
            progressColor: '#ff00ff',
            cursorColor: '#ffff00',
            height: 80,
            barWidth: 3,
            barGap: 1,
            barRadius: 2,
            responsive: true,
            normalize: true,
            backend: 'WebAudio',
            interact: true,
            hideScrollbar: true
        });
        
        // Load audio
        wavesurfer.load(audioUrl);
        
        // Store wavesurfer instance
        waveforms[index] = wavesurfer;
        
        // Play/Pause button functionality
        const playPauseBtn = document.querySelector(`[data-index="${index}"].play-pause-btn`);
        const stopBtn = document.querySelector(`[data-index="${index}"].stop-btn`);
        const downloadBtn = document.querySelector(`[data-index="${index}"].download-btn`);
        const timeDisplay = document.getElementById(`time-${index}`);
        
        playPauseBtn.addEventListener('click', function() {
            if (wavesurfer.isPlaying()) {
                wavesurfer.pause();
                showPlayButton(playPauseBtn);
            } else {
                // Pause all other wavesurfers
                waveforms.forEach((ws, i) => {
                    if (i !== index && ws.isPlaying()) {
                        ws.pause();
                        const otherBtn = document.querySelector(`[data-index="${i}"].play-pause-btn`);
                        showPlayButton(otherBtn);
                    }
                });
                
                wavesurfer.play();
                showPauseButton(playPauseBtn);
            }
        });
        
        stopBtn.addEventListener('click', function() {
            wavesurfer.stop();
            showPlayButton(playPauseBtn);
        });
        
        // Download button functionality
        downloadBtn.addEventListener('click', function() {
            const filename = downloadBtn.getAttribute('data-filename') || `sample_${index}`;
            downloadAudio(audioUrl, filename, downloadBtn);
        });
        
        // Update time display
        wavesurfer.on('audioprocess', function() {
            updateTimeDisplay(wavesurfer, timeDisplay);
        });
        
        wavesurfer.on('seek', function() {
            updateTimeDisplay(wavesurfer, timeDisplay);
        });
        
        wavesurfer.on('ready', function() {
            updateTimeDisplay(wavesurfer, timeDisplay);
        });
        
        // When audio finishes
        wavesurfer.on('finish', function() {
            showPlayButton(playPauseBtn);
        });
        
        // Handle errors
        wavesurfer.on('error', function(error) {
            console.error(`Error loading audio ${index}:`, error);
            const container = document.getElementById(containerId);
            container.innerHTML = '<p class="text-danger">Error al cargar el audio</p>';
        });
    });
    
    // Helper functions
    function showPlayButton(btn) {
        btn.querySelector('.play-text').classList.remove('d-none');
        btn.querySelector('.pause-text').classList.add('d-none');
    }
    
    function showPauseButton(btn) {
        btn.querySelector('.play-text').classList.add('d-none');
        btn.querySelector('.pause-text').classList.remove('d-none');
    }
    
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    function updateTimeDisplay(wavesurfer, timeDisplay) {
        const current = wavesurfer.getCurrentTime();
        const total = wavesurfer.getDuration();
        
        if (total) {
            timeDisplay.textContent = `${formatTime(current)} / ${formatTime(total)}`;
        }
    }
    
    // Download function
    async function downloadAudio(url, filename, button) {
        try {
            // Change button state to show downloading
            const originalText = button.innerHTML;
            button.innerHTML = '⬇️ DOWNLOADING...';
            button.disabled = true;
            
            // Fetch the audio file
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const blob = await response.blob();
            
            // Create download link
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = downloadUrl;
            
            // Clean filename and add extension
            const cleanFilename = filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            a.download = `${cleanFilename}.mp3`;
            
            // Trigger download
            document.body.appendChild(a);
            a.click();
            
            // Cleanup
            window.URL.revokeObjectURL(downloadUrl);
            document.body.removeChild(a);
            
            // Reset button
            button.innerHTML = '✅ DOWNLOADED!';
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 2000);
            
        } catch (error) {
            console.error('Download failed:', error);
            
            // Show error state
            button.innerHTML = '❌ FAILED';
            setTimeout(() => {
                button.innerHTML = '💾 DOWNLOAD';
                button.disabled = false;
            }, 2000);
        }
    }
});
