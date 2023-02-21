/*
Create an ES6 courses module called 'courses' to describe the courses at MUN for Winter 2023.
*/




import { readFileSync } from "fs";

class Course {

  static courses = [];
  constructor(subject, number, name, section, crn, room, type,slot) {
    this.subject = subject;
    this.number = number;
    this.name = name;
    this.section = section;
    this.crn = crn;
    this.room = room;
    this.type = type;
    this.slot = slot;
    
  }
  
  
  static load(datafile){
         try {
          const lines = findValidCourse(datafile, 'Subject:');
          for (const line of lines) {
            const course = parseCourse(line);
            Course.courses.push(course);
          }
      } catch (error) {
        console.error(`Error loading courses: ${error.message}`);
     }
    }
 //Here is find methood to find a course by persing name,number and section 
 //this methood will return True if it is find a match 
  static find(name, number, section) {
    
    return  Course.courses.filter(course => {
      if (name && course.subject.toLowerCase().indexOf(name.toLowerCase()) === -1) {
        return false;
      }
      if (number && course.number !== number) {
        return false;
      }
      if (section && course.section !== section) {
        return false;
      }
      return true;
    });
  }
}

//this methood will make sure that that a valid course  and it will read after a valid Subject:
function findValidCourse(filename, searchString) {
  const data = readFileSync(filename, {encoding:'utf8', flag:'r'});
  const lines = data.split('\n');
  const matchingLines = [];
  let found = false;
  for (const line of lines) {
    if (line.startsWith(searchString)) {
      found = true;
      continue;
    }
    if (found) {
      matchingLines.push(line);
    }
  }
  return matchingLines; //returning a valid match subject
}

//conflicts methood 
function conflictsWith(otherCourse) {
    return this.slot === otherCourse.slot;
  }

//this function will read data from muncourse.txt i have count manually to dettermine each 
//subjects,number,section etc.
function parseCourse(line) {

  const subject = line.slice(0, 4);
  const number = line.slice(5, 9);
  const name = line.slice(10, 37).trim();
  const section = line.slice(38, 41).trim();
  const crn = line.slice(42, 47);
  const room = line.slice(80, 84).trim();
  const type = line.slice(86, 89).trim();
  const slot = line.slice(48, 52).trim();

  return new Course(subject, number, name, section, crn, room, type,slot);
}

export{Course};

