export default function setupNowPlaying() {
  const LAST_FM_USER_NAME = 'kolonatalie';
  const LAST_FM_API_KEY = '2306492e3227f916f9633d4b82d81ee7';

  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LAST_FM_USER_NAME}&api_key=${LAST_FM_API_KEY}&format=json`;

  async function getNowPlaying() {
    const nowPlayingElement = document.getElementById('now-playing-song');
    const defaultText = `
    playing now: <span class="running">
      <span>
        <a href="https://www.last.fm/user/kolonatalie/playlists/14361203" target="_blank">
          <span> * Chill Vibes Playlist</span>
          <span> * Chill Vibes Playlist</span>
        </a>
      </span>
    </span>
    `;

    if (nowPlayingElement) {
      nowPlayingElement.innerHTML = defaultText;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.recenttracks && data.recenttracks.track) {
        const track = Array.isArray(data.recenttracks.track)
          ? data.recenttracks.track[0]
          : data.recenttracks.track;
        const isNowPlaying = track['@attr'] && track['@attr'].nowplaying === 'true';

        if (isNowPlaying) {
          const artist = track.artist['#text'];
          const song = track.name;
          const songUrl = track.url;
          const nowPlayingText = `${artist} - ${song}`;

          if (nowPlayingElement) {
            nowPlayingElement.innerHTML = `playing now: <span class="running"><span><a href="${songUrl}" target="_blank"><span> * ${nowPlayingText}</span><span>  * ${nowPlayingText}
                  </span></a></span></span>`;
          }
        }
      }
    } catch (error) {
      console.error('Error fetching data from Last.fm:', error);
    }
  }
  getNowPlaying();
}
