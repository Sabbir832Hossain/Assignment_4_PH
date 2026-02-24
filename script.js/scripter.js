let interviewList = [];
let rejectedList = [];

let currentStatus = 'all-filtering-btn';

const totalCount = document.getElementById('total');
const availableJobs = document.getElementById('availableJobs');
const interviewCount = document.getElementById('interviewCount');
const rejectedCount = document.getElementById('rejectedCount');

const allFilteringBtn = document.getElementById('all-filtering-btn');
const interviewFilteringBtn = document.getElementById(
  'interview-filtering-btn',
);
const rejectedFilteringBtn = document.getElementById('rejected-filtering-btn');

const allCardsSection = document.getElementById('all-cards');

let filterSection = document.getElementById('filter-section');

const emptyInfo = document.getElementById('empty-info');

function calculate() {
  totalCount.innerText = allCardsSection.children.length;
  availableJobs.innerText = allCardsSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
calculate();

function togglingStyle(id) {
  allFilteringBtn.classList.add('bg-base-200', 'text-black');
  interviewFilteringBtn.classList.add('bg-base-200', 'text-black');
  rejectedFilteringBtn.classList.add('bg-base-200', 'text-black');

  allFilteringBtn.classList.remove('bg-blue-500', 'text-white');
  interviewFilteringBtn.classList.remove('bg-blue-500', 'text-white');
  rejectedFilteringBtn.classList.remove('bg-blue-500', 'text-white');

  const clickedBtn = document.getElementById(id);

  clickedBtn.classList.remove('bg-base-200', 'text-black');
  clickedBtn.classList.add('bg-blue-500', 'text-white');

  currentStatus = id;
  emptyInfo.classList.add('hidden');
  if (currentStatus === 'interview-filtering-btn') {
    allCardsSection.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderInterview();
    if (interviewList.length === 0) {
      emptyInfo.classList.remove('hidden');
    }
  } else if (currentStatus === 'all-filtering-btn') {
    allCardsSection.classList.remove('hidden');
    filterSection.classList.add('hidden');
    emptyInfo.classList.add('hidden');
  } else if (currentStatus === 'rejected-filtering-btn') {
    allCardsSection.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderRejected();
    if (rejectedList.length === 0) {
      emptyInfo.classList.remove('hidden');
    }
  }
}
togglingStyle('all-filtering-btn');
