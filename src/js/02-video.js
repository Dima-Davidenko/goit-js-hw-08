import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const KEY_NAME = 'videoplayer-current-time';

const player = new Player(document.querySelector('iframe'));
player.on('timeupdate', throttle(saveCurrentTimeInStorage, 1000));

function saveCurrentTimeInStorage({ seconds: currentTime }) {
  localStorage.setItem(KEY_NAME, JSON.stringify(currentTime));
}

player
  .setCurrentTime(+localStorage.getItem(KEY_NAME))
  .then()
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log('Ooops.... I think it was a mistake!');
        break;
      default:
        console.log(
          "I don't know what's happened but I'm shure it was a mistake!"
        );
        break;
    }
  });
