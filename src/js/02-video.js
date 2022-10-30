import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const KEY_NAME = 'videoplayer-current-time';

const player = new Player(document.querySelector('iframe'));
player.on('timeupdate', throttle(saveCurrentTimeInStorage, 1000));

function saveCurrentTimeInStorage({ seconds: currentTime }) {
  localStorage.setItem(KEY_NAME, JSON.stringify(currentTime));
}

if (JSON.parse(localStorage.getItem(KEY_NAME))) {
  player.setCurrentTime(+localStorage.getItem(KEY_NAME));
}
