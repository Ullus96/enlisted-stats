export interface IStage {
	startDate: Date;
	endDate: Date;
}

export interface IEvent {
	name: string;
	startDate: Date;
	endDate: Date;
	hoursInStage: number;
	stages: IStage[];
	rewards: string[];
}

export interface IEventFirestore extends IEvent {
	dbId: string;
}
