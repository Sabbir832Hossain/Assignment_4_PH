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
