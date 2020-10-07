<template>
    <section class="tk-simulation">
        <div class="tk-simulation__header tk-text--center tk-animation tk-animation--fade-in">
            <h1>Let's plan your <strong>saving goal</strong>.</h1>
        </div>
        <div class="tk-simulation__body">
            <form role="form" class="tk-form" v-on:submit="addPlanning">
                <div class="tk-card tk-animation tk-animation--fade-in">
                    <div class="tk-card__header">
                        <div class="tk-row">
                            <div class="tk-col">
                                <i class="tk-icon tk-buy-house"></i>
                            </div>
                        </div>
                        <div class="tk-row">
                            <div class="tk-col">
                                <h2>Buy a house</h2>
                            </div>
                        </div>
                        <div class="tk-row">
                            <div class="tk-col">
                                <h3>Saving goal</h3>
                            </div>
                        </div>
                    </div>
                    <div class="tk-card__body">
                        <div class="tk-row">
                            <div class="tk-col">
                                <div class="tk-form__group">
                                    <label for="total-amount">Total amount</label>
                                    <div class="tk-form__input-group">
                                        <div class="tk-form__input-prepend">
                                            $
                                        </div>
                                        <input type="text"
                                               id="total-amount"
                                               name="total-amount"
                                               class="tk-form__input"
                                               placeholder="0.00"
                                               v-model="totalAmount"
                                               v-on:keyup="formatCurrency">
                                    </div>
                                </div>
                            </div>
                            <div class="tk-col" v-if="showDatepicker">
<!--                                 <Datepicker [label]="'Reach goal by'" [minDate]="minGoalDate" (changeDate)="changeDate($event)"></Datepicker> -->
                                <Datepicker label="Reach goal by" :minDate="minGoalDate" @change-date="changeDate"></Datepicker>
<!--                                <RwvArticleMeta :article="article" :actions="true"></RwvArticleMeta>-->
                            </div>
                        </div>
                        <div class="tk-row">
                            <div class="tk-col">
                                <div class="tk-simulation__result">
                                    <div class="tk-card tk-card--small tk-mt--28">
                                        <div class="tk-card__body tk-flex tk-justify-content--space-between tk-align-items--center">
                                            <span class="tk-simulation__result-label">Monthly <span class="tk-hide--xs">amount</span></span>
                                            <span class="tk-simulation__result-value">
                                            <span v-if="monthlyAmount">{{monthlyAmount}}</span>
                                            <span v-if="!monthlyAmount">{{EMPTY_VALUE}}</span>
                                        </span>
                                        </div>
                                        <div class="tk-card__footer">
                                            <span class="tk-simulation__result-text">
                                                You're planning <strong>{{installments}} monthly deposits</strong> to reach your <strong v-if="totalAmount">{{totalAmount}}</strong> <strong v-if="!totalAmount">{{EMPTY_VALUE}}</strong> goal by <strong>{{goalMonth}} {{goalYear}}</strong>.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tk-card__footer tk-card__footer--transparent tk-flex tk-justify-content--center">
                        <button type="submit" id="tk-simulation__submit" class="tk-button tk-button--rounded tk-button--blue" :disabled="!totalAmount">
                            Confirm
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script lang="ts">
    import { Options, Vue } from "vue-class-component";
    import Datepicker from "@/components/datepicker/datepicker.vue";
    import DollarUtil from "@/utils/dollar.util";

    @Options({
        data: () => ({
            totalAmount: '',
            EMPTY_VALUE: '',
            datePickerLabel: '',
            goalMonth: '',
            goalYear: '',
            minGoalDate: new Date()
        }),
        components: {
            Datepicker
        }
    })
    export default class Simulation extends Vue {

        totalAmount: string;

        monthlyAmount: string;

        installments = 1;

        currentDate = new Date();

        minGoalDate: Date;

        goalDate: Date;

        goalMonth: string;

        goalYear: string;

        showDatepicker = false;

        private readonly EMPTY_VALUE: string = '0.00';

        mounted() {
            this.initGoalDate();
        }

        formatCurrency(event: any): void {
            this.totalAmount = this.transformToDollars(event.target.value);
            if (!this.totalAmount || this.totalAmount === this.EMPTY_VALUE) {
                this.totalAmount = '';
                this.monthlyAmount = this.EMPTY_VALUE;
            } else {
                this.updateMonthlyAmount();
            }
        }

        changeDate(date: Date): void {
            this.goalDate = date;
            this.installments = this.getMonthDiff(date);
            this.updateMonthlyAmount();
            this.updateGoalInfo(date);
        }

        addPlanning(): void {
            // Form submit action
        }

        private initGoalDate(): void {
            this.minGoalDate = new Date();
            this.minGoalDate = new Date(this.minGoalDate.setMonth(this.minGoalDate.getMonth() + 1));

            this.updateGoalInfo(this.minGoalDate);
        }

        private updateMonthlyAmount(): void {
            if (this.totalAmount) {
                const total = parseInt(this.totalAmount.replace(/\D/g, ''), 10);
                const monthlyAmount =  total / this.installments;
                this.monthlyAmount = this.transformToDollars(monthlyAmount);
            }
        }

        private transformToDollars(value: string | number): string {
            return DollarUtil.convert(value);
        }

        private getMonthDiff(dateTo: Date): number {
            return dateTo.getMonth() - this.currentDate.getMonth() + (12 * (dateTo.getFullYear() - this.currentDate.getFullYear()));
        }

        private updateGoalInfo(dateTo: Date): void {
            this.goalMonth = dateTo.toLocaleString('en-US', { month: 'long' });
            this.goalYear = dateTo.getFullYear().toString();

            this.showDatepicker = true;
        }
    }
</script>

<style lang="scss">
    @import "simulation";
</style>
