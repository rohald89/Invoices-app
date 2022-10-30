<script lang="ts">
  import ArrowLeft from './icons/ArrowLeft.svelte';
  import ArrowRight from './icons/ArrowRight.svelte';
  import Calendar from './icons/Calendar.svelte';

  export let classes = '';
  export let selectedDate: Date = new Date();
  export let onDateChange: (date: Date) => void = () => {};

  const today = new Date();
  let isOpen = false;
  // abreviated month names
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  let selectedDay = today.getDate();
  let selectedMonth = months[today.getMonth()];
  let selectedYear = today.getFullYear();

  const changeNextMonth = () => {
    const nextMonth = selectedDate.getMonth() + 1;
    selectedDate = new Date(selectedDate.setMonth(nextMonth));
    selectedMonth = months[selectedDate.getMonth()];
    selectedYear = selectedDate.getFullYear();
    getDays(selectedDate.getMonth(), selectedYear);
  };

  const changePrevMonth = () => {
    const prevMonth = selectedDate.getMonth() - 1;
    selectedDate = new Date(selectedDate.setMonth(prevMonth));
    selectedMonth = months[selectedDate.getMonth()];
    selectedYear = selectedDate.getFullYear();
    getDays(selectedDate.getMonth(), selectedYear);
  };

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const lastDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, daysInMonth(month, year)).getDay();
  };

  const daysInPrevMonth = (month: number, year: number) => {
    return new Date(year, month - 1, 0).getDate();
  };

  const getDays = (month: number, year: number) => {
    const days = [];
    const firstDay = firstDayOfMonth(month, year);
    const lastDay = lastDayOfMonth(month, year);
    const daysInPrev = daysInPrevMonth(month, year);
    const daysInCurrent = daysInMonth(month, year);
    // add days from previous month
    for (let i = firstDay; i > 0; i--) {
      days.push({
        day: daysInPrev - i + 1,
        prevMonth: true
      });
    }

    // add days from current month
    for (let i = 1; i <= daysInCurrent; i++) {
      days.push({
        day: i,
        currentMonth: true
      });
    }

    // add days from next month
    for (let i = 1; i <= 6 - lastDay; i++) {
      days.push({
        day: i,
        nextMonth: true
      });
    }

    return days;
  };

  const days = getDays(selectedDate.getMonth(), selectedDate.getFullYear());

  const handleDayClick = (day: number) => {
    selectedDate = new Date(selectedDate.setDate(day));
    selectedDay = selectedDate.getDate();
    selectedMonth = months[selectedDate.getMonth()];
    selectedYear = selectedDate.getFullYear();
    onDateChange(selectedDate);
  };
</script>

<div
  on:blur={() => (isOpen = false)}
  class={`${classes} flex flex-col gap-[10px]
text-body-1 font-bold tracking-normal text-black dark:text-white`}
>
  <span class="text-body-1 font-medium tracking-normal text-grayishBlue dark:text-coolGrey"
    >Invoice Date</span
  >
  <div class="relative">
    <button
      type="button"
      on:click={() => (isOpen = !isOpen)}
      class="box-border flex w-full cursor-pointer items-center justify-between rounded-[4px] border-1 border-lavender py-4 px-5 text-body-1 font-bold tracking-normal text-black focus:outline-none focus:ring-1 focus:ring-violet dark:border-darkBlue dark:bg-veryDarkBlue dark:text-white"
      ><p>{selectedDay} {selectedMonth} {selectedYear}</p>
      <Calendar />
    </button>
    {#if isOpen}
      <div
        class="absolute top-16 w-full rounded-lg bg-white p-6 shadow-filter-light dark:bg-veryDarkBlue dark:shadow-filter-dark"
      >
        <div class="mb-5 flex justify-between">
          <button type="button" on:click={changePrevMonth} class="arrows prev-month"
            ><ArrowLeft /></button
          >
          <div class="month-name">{selectedMonth} {selectedYear}</div>
          <button type="button" on:click={changeNextMonth} class="arrows next-month"
            ><ArrowRight /></button
          >
        </div>
        <div class="grid-rows-7 grid grid-cols-7 place-items-center gap-0">
          {#each getDays(selectedDate.getMonth(), selectedYear) as day}
            {#if day.day === selectedDay && day.currentMonth}
              <button type="button" class="day selected" on:click={() => handleDayClick(day.day)}
                >{day.day}</button
              >
            {:else if day.currentMonth}
              <button
                type="button"
                on:click={() => {
                  selectedDay = day.day;
                  handleDayClick(day.day);
                  isOpen = false;
                }}
                class="day current-month">{day.day}</button
              >
            {:else if day.nextMonth}
              <button
                type="button"
                on:click={() => {
                  changeNextMonth();
                  selectedDay = day.day;
                  handleDayClick(day.day);
                  isOpen = false;
                }}
                class="day next-month">{day.day}</button
              >
            {:else}
              <button
                type="button"
                on:click={() => {
                  changePrevMonth();
                  selectedDay = day.day;
                  handleDayClick(day.day);
                  isOpen = false;
                }}
                class="day prev-month">{day.day}</button
              >
            {/if}
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
</style>
