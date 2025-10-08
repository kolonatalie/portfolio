export const reviews = [
  {
    id: 1,
    name: 'casa olea',
    country: 'Spain',
    text: 'Natalia is a great professional who understood exactly what we were looking for. She was also happy to adjust some minor modifications we had. I am so glad we decided to work with her and absolutely recommend her job.',
  },
  {
    id: 2,
    name: 'gabe starky',
    country: 'United States',
    text: 'She was responsive and great to work with. She was dedicated to making sure that my project came out the best way possible. I definitely will be working with her in the future.',
  },
  {
    id: 5,
    name: 'traft',
    country: 'Canada',
    text: "Natalia is a true professional. This is the second time we've worked with her and she's exceeded our expectations each time. Very creative while also sticking with our request. Would recommend!",
  },
  {
    id: 6,
    name: 'michel thysen',
    country: 'United Kingdom',
    text: 'Natalia translated my briefing to the perfect end result. Look no further! I would recommend her any time!',
  },
  {
    id: 3,
    name: 'sarah hughes',
    country: 'United States',
    text: 'Natalia always does an incredible job with attention to detail & quick turnaround time. She also takes our feedback & notes and translates them into the filter incredibly. Thank you again, Natalia!',
  },
  {
    id: 4,
    name: 'bemarais',
    country: 'Canada',
    text: "Natalia was absolutely amazing to work with! She listened, asked questions and kept coming back with improvements/tweaks until I was 100% happy! I'm over the moon with the results and will definitely use her again. I highly, highly recommend her work!",
  },
];
/* eslint-disable no-param-reassign */
export function updateReviewsContent(personIndex, reviewElements) {
  const item = reviews[personIndex];
  reviewElements[0].textContent = item.name;
  reviewElements[1].textContent = item.country;
  reviewElements[2].textContent = item.text;
}

export function showPerson(personIndex, reviewElements, state) {
  if (state.isAnimating) return;
  state.isAnimating = true;

  reviewElements.forEach((el) => el.classList.remove('is-shown'));

  const transitionPromises = reviewElements.map((el) => new Promise((resolve) => {
    const onTransitionEnd = () => {
      el.removeEventListener('transitionend', onTransitionEnd);
      resolve();
    };
    el.addEventListener('transitionend', onTransitionEnd);
  }));

  Promise.all(transitionPromises).then(() => {
    updateReviewsContent(personIndex, reviewElements);

    reviewElements.forEach((el) => el.classList.add('is-shown'));
    state.isAnimating = false;
  });
}
/* eslint-enable no-param-reassign */
