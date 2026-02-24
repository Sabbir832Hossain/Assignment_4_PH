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

filterSection.addEventListener('click', handleCard);
allCardsSection.addEventListener('click', handleCard);

function handleCard(event) {
  const successBtn = event.target.closest('.success-btn-of-card');
  const warningBtn = event.target.closest('.warning-btn-of-card');
  const deleteBtn = event.target.closest('.delete-btn-of-card');

  if (successBtn) {
    const parentNode = event.target.closest('.card-item');

    const title = parentNode.querySelector('.title-of-card').innerText;
    const skill = parentNode.querySelector('.skill-of-card').innerText;
    const salary = parentNode.querySelector('.salary-of-card').innerText;
    const status = parentNode.querySelector('.status-of-card').innerText;
    const description = parentNode.querySelector(
      '.description-of-card',
    ).innerText;

    const cardInfo = {
      title,
      skill,
      salary,
      status: 'Interview',
      description,
    };

    const existInterview = interviewList.find(
      item => item.title === cardInfo.title,
    );

    if (!existInterview) {
      interviewList.push(cardInfo);
    }
    rejectedList = rejectedList.filter(item => item.title != cardInfo.title);
    if (currentStatus === 'rejected-filtering-btn') {
      renderRejected();
    }
    calculate();
  } else if (warningBtn) {
    const parentNode = event.target.closest('.card-item');

    const title = parentNode.querySelector('.title-of-card').innerText;
    const skill = parentNode.querySelector('.skill-of-card').innerText;
    const salary = parentNode.querySelector('.salary-of-card').innerText;
    const status = parentNode.querySelector('.status-of-card').innerText;
    const description = parentNode.querySelector(
      '.description-of-card',
    ).innerText;

    const cardInfo = {
      title,
      skill,
      salary,
      status: 'Rejected',
      description,
    };

    const existWarning = rejectedList.find(
      item => item.title === cardInfo.title,
    );

    if (!existWarning) {
      rejectedList.push(cardInfo);
    }

    interviewList = interviewList.filter(item => item.title != cardInfo.title);
    if (currentStatus === 'interview-filtering-btn') {
      renderInterview();
    }
    calculate();
  } else if (deleteBtn) {
    const parentNode = event.target.closest('.card-item');
    const parent = parentNode.parentNode;
    console.log(parent);
    const title = parentNode.querySelector('.title-of-card').innerText;
    parentNode.remove();
    if (parent.children.length === 0) {
      emptyInfo.classList.remove('hidden');
    }
    interviewList = interviewList.filter(item => item.title !== title);
    rejectedList = rejectedList.filter(item => item.title !== title);

    calculate();
  }
}

function renderInterview() {
  if (interviewList.length === 0) {
    emptyInfo.classList.remove('hidden');
  }

  filterSection.innerHTML = '';
  for (const interview of interviewList) {
    let div = document.createElement('div');
    div.className = 'card-item flex justify-between border p-[30px]';
    div.innerHTML = `
                <div class="space-y-2">
                    <div class="space-y-2">
                        <h2 class="title-of-card font-semibold text-[18px]">${interview.title}</h2>
                        <p class="skill-of-card text-[#777777]">${interview.skill}</p>
                        <p class="salary-of-card text-[#777777]">${interview.salary}</p>
                    </div>
                    <div>
                        <p class="status-of-card font-medium text-black btn px-3 py-1 bg-green-300">${interview.status}</p>
                    </div>
                    <p class="description-of-card text-[#777777]">Build cross-platform mobile applications using React Native. Work on products used by millions of
                        users worldwide.</p>
                    <div>
                        <button class="success-btn-of-card btn btn-outline btn-success">Interview</button>
                        <button class="warning-btn-of-card btn btn-outline btn-error">Rejected</button>
                    </div>
                </div>
                <div class="">
                    <button class="delete-btn-of-card btn rounded-full w-[30px] h-[30px] p-[24px]">
                        <i class="fa-regular fa-trash-can delete-btn-of-card"></i>
                    </button>
                </div>
    `;
    filterSection.appendChild(div);
  }
}

function renderRejected() {
  if (rejectedList.length === 0) {
    emptyInfo.classList.remove('hidden');
  }

  filterSection.innerHTML = '';
  for (const rejected of rejectedList) {
    let div = document.createElement('div');
    div.className = 'card-item flex justify-between border p-[30px]';
    div.innerHTML = `
                <div class="space-y-2">
                    <div class="space-y-2">
                        <h2 class="title-of-card font-semibold text-[18px]">${rejected.title}</h2>
                        <p class="skill-of-card text-[#777777]">${rejected.skill}</p>
                        <p class="salary-of-card text-[#777777]">${rejected.salary}</p>
                    </div>
                    <div>
                        <p class="status-of-card font-medium btn px-3 py-1 bg-red-300">${rejected.status}</p>
                    </div>
                    <p class="description-of-card text-[#777777]">Build cross-platform mobile applications using React Native. Work on products used by millions of
                        users worldwide.</p>
                    <div>
                        <button class="success-btn-of-card btn btn-outline btn-success">Interview</button>
                        <button class="warning-btn-of-card btn btn-outline btn-error">Warning</button>
                    </div>
                </div>
                <div class="">
                    <button class="delete-btn-of-card btn rounded-full w-[30px] h-[30px] p-[24px]">
                        <i class="fa-regular fa-trash-can delete-btn-of-card"></i>
                    </button>
                </div>
    `;
    filterSection.appendChild(div);
  }
}
