export interface IStage {
	startDate: Date;
	endDate: Date;
}

export interface IEvent {
	name: string;
	startDate: Date;
	endDate: Date;
	stages: IStage[];
	rewards: string[];
}
