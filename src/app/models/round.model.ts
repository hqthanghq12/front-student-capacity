import {Contest} from './contest';
import {Judges} from "./judges.model";
import {Team} from "./team";
import { Campus } from './campus.model';

export class Round {
  id: number;
  name: string;
  external_url: string;
  description: string;
  end_time: Date;
  total_questions: number;
  time_exam: number;
  name_campus: Campus;
  time_type_exam: number;
  contest_id: number;
  max_questions_exam: number;
  time : number;
  type_exam_id: number;
  name_subject :string;
  start_time: Date;
  teams: Array<Team>;
  judges: Array<Judges>;
  contest: Contest
}
