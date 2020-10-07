<template>
    <div class="tk-datepicker" v-on:keydown="handleKeyPress">
        <label for="tk-datepicker__input-group">{{label}}</label><!-- *ngIf="label" (click)="focusInputDate()" -->
        <div ref="inputDateElement" id="tk-datepicker__input-group" class="tk-datepicker__input-group" tabindex="1">
            <button ref="leftArrowElement" type="button" id="tk-datepicker__preview" class="tk-datepicker__preview" v-on:click="previousMonth">
                <i class="tk-icon tk-arrow-left"></i>
            </button>
            <div class="tk-datepicker__input">
                <div class="tk-datepicker__month">{{selectedMonth}}</div>
                <div class="tk-datepicker__year">{{selectedYear}}</div>
            </div>
            <button ref="rightArrowElement" type="button" id="tk-datepicker__next" class="tk-datepicker__next" v-on:click="nextMonth">
                <i class="tk-icon tk-arrow-right"></i>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Options, Vue} from "vue-class-component";

    @Options({
        data: () => ({
            selectedMonth: '',
            selectedYear: ''
        }),
        props: {
            label: String,
            minDate: Date
        }
    })
    export default class Datepicker extends Vue {

        inputDateElement: any;
        leftArrowElement: any;
        rightArrowElement: any;

        label: string;

        minDate: Date;

        minimunDate: Date;

        changeDate: any;

        selectedDate = new Date();

        selectedMonth: string;

        selectedYear: string;

        mounted() {
            if (!this.minDate) {
                this.resetDate();
            } else {
                this.minimunDate = this.minDate;
                this.selectedDate = new Date(this.minimunDate.valueOf());
                this.setSelectedInfo();
            }

            this.setElements();
        }

        handleKeyPress(event: any): void {
            const LEFT_ARROW_KEY = [37, 'ArrowLeft'];
            const RIGHT_ARROW_KEY = [39, 'ArrowRight'];
            const UP_ARROW_KEY = [38, 'ArrowUp'];
            const DOWN_ARROW_KEY = [40, 'ArrowDown'];

            const allowedKeys = [
                ...LEFT_ARROW_KEY,
                ...RIGHT_ARROW_KEY,
                ...UP_ARROW_KEY,
                ...DOWN_ARROW_KEY
            ];

            const key: string | number = event.key || event.keyCode;

            if (allowedKeys.includes(key)) {
                if (LEFT_ARROW_KEY.includes(key)) {
                    this.focusLeftArrow();
                    this.previousMonth();
                }

                if (RIGHT_ARROW_KEY.includes(key)) {
                    this.focusRightArrow();
                    this.nextMonth();
                }

                if (UP_ARROW_KEY.includes(key)) {
                    this.cleanArrowsFocus();
                    this.nextYear();
                }

                if (DOWN_ARROW_KEY.includes(key)) {
                    this.cleanArrowsFocus();
                    this.previousYear();
                }
            }
        }

        nextMonth(): void {
            const newDate = new Date(this.selectedDate.setMonth(this.selectedDate.getMonth() + 1));

            this.change(newDate);
        }

        previousMonth(): void {
            const newDate = new Date(this.selectedDate.setMonth(this.selectedDate.getMonth() - 1));

            this.change(newDate);
        }

        nextYear(): void {
            const newDate = new Date(this.selectedDate.setFullYear(this.selectedDate.getFullYear() + 1));

            this.change(newDate);
        }

        previousYear(): void {
            const newDate = new Date(this.selectedDate.setFullYear(this.selectedDate.getFullYear() - 1));

            this.change(newDate);
        }

        focusInputDate(): void {
            this.inputDateElement.focus();
        }

        private setElements(): void {
            this.inputDateElement = document.getElementById('tk-datepicker__input-group');
            this.leftArrowElement = document.getElementById('tk-datepicker__preview');
            this.rightArrowElement = document.getElementById('tk-datepicker__next');
        }

        private focusLeftArrow(): void {
            this.cleanArrowsFocus();
            this.leftArrowElement.focus();
            this.cleanFocusAfterAction();
        }

        private focusRightArrow(): void {
            this.cleanArrowsFocus();
            this.rightArrowElement.focus();
            this.cleanFocusAfterAction();
        }

        private cleanArrowsFocus(): void {
            this.focusInputDate();
            this.leftArrowElement.blur();
            this.rightArrowElement.blur();
        }

        private cleanFocusAfterAction(): void {
            setTimeout(() => {
                this.cleanArrowsFocus();
            }, 75);
        }

        private setSelectedInfo(): void {
            this.selectedMonth = this.selectedDate.toLocaleString('en-US', { month: 'long' });
            this.selectedYear = this.selectedDate.getFullYear().toString();

            // this.changeDate.emit(this.selectedDate);

            this.$emit('change-date', this.selectedDate);
        }

        private change(date: Date): void {
            if (this.canChangeDate(date)) {
                this.selectedDate = date;
                this.setSelectedInfo();
            } else {
                this.resetDate();
            }
        }

        private canChangeDate(newDate: Date): boolean {
            return newDate > this.minimunDate;
        }

        private resetDate(): void {
            if (!this.minimunDate) {
                this.minimunDate = new Date();
                this.minimunDate = new Date(this.minimunDate.setMonth(this.minimunDate.getMonth() + 1));
            }

            this.selectedDate = new Date(this.minimunDate.valueOf());

            this.setSelectedInfo();
        }
    }
</script>

<style lang="scss">
@import "datepicker";
</style>
