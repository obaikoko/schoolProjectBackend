const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLEnumType,
} = require('graphql');
const Student = require('../model/student');
const Staff = require('../model/staff');
const Sponsor = require('../model/sponsor');
const User = require('../model/user');
const bcrypt = require('bcrypt');

const SponsorType = new GraphQLObjectType({
  name: 'Sponsor',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    phoneNumber: {
      type: GraphQLString,
    },
    occupation: {
      type: GraphQLString,
    },
    relationship: {
      type: GraphQLString,
    },
    address: {
      type: GraphQLString,
    },
    students: {
      type: new GraphQLList(StudentType),
      resolve(parent, args) {
        return Student.find({ _id: parent.studentIds });
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    surname: {
      type: GraphQLString,
    },
    stateOfOrigin: {
      type: GraphQLString,
    },
    localGvt: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
  }),
});
const StaffType = new GraphQLObjectType({
  name: 'Staff',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    surname: {
      type: GraphQLString,
    },
    qualification: {
      type: GraphQLString,
    },
    gender: {
      type: GraphQLString,
    },
    maritalStatus: {
      type: GraphQLString,
    },
    dob: {
      type: GraphQLString,
    },
    yearAdmitted: {
      type: GraphQLString,
    },
    role: {
      type: GraphQLString,
    },
    stateOfOrigin: {
      type: GraphQLString,
    },
    localGvt: {
      type: GraphQLString,
    },
    homeTown: {
      type: GraphQLString,
    },
    residence: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
  }),
});

const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    surname: {
      type: GraphQLString,
    },
    gender: {
      type: GraphQLString,
    },
    level: {
      type: GraphQLString,
    },
    dob: {
      type: GraphQLString,
    },
    yearAdmitted: {
      type: GraphQLString,
    },
    stateOfOrigin: {
      type: GraphQLString,
    },
    localGvt: {
      type: GraphQLString,
    },
    homeTown: {
      type: GraphQLString,
    },
    sponsor: {
      type: SponsorType,
      resolve(parent, args) {
        return Sponsor.findById(parent.sponsorId);
      },
    },
  }),
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add User
    addUser: {
      type: UserType,
      args: {
        firstName: {
          type: GraphQLString,
        },
        lastName: {
          type: GraphQLString,
        },
        surname: {
          type: GraphQLString,
        },
        stateOfOrigin: {
          type: GraphQLString,
        },
        localGvt: {
          type: GraphQLString,
        },
        phone: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
      },
      resolve: async (parent, args) => {
        const userExist = User.find({ email: args.email });
        if (userExist) {
          return 'User already Exist';
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(args.password, salt);
        const user = User.create({
          firstName: args.firstName,
          lastName: args.lastName,
          surname: args.surname,
          stateOfOrigin: args.stateOfOrigin,
          localGvt: args.localGvt,
          phone: args.phone,
          email: args.email,
          password: hashPassword,
        });
        return user;
      },
    },

    // Login User
    loginUser: {
      type: UserType,
      args: {
        email: {
          type: GraphQLNonNull(GraphQLString),
        },
        password: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, args) => {
        const user = await User.findOne({ email: args.email });
        if (!user) {
          throw new Error('User not found!');
        }
        const isPasswordValid = await bcrypt.compare(
          args.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }
        return user;
      },
    },
    // Add Staff
    addStaff: {
      type: StaffType,
      args: {
        firstName: {
          type: GraphQLString,
        },
        lastName: {
          type: GraphQLString,
        },
        surname: {
          type: GraphQLString,
        },
        qualification: {
          type: GraphQLString,
        },
        gender: {
          type: new GraphQLEnumType({
            name: 'StaffGenderType',
            values: {
              Male: { value: 'Male' },
              Female: { value: 'Female' },
            },
          }),
        },
        maritalStatus: {
          type: GraphQLString,
        },
        dob: {
          type: GraphQLString,
        },
        yearAdmitted: {
          type: GraphQLString,
        },
        role: {
          type: GraphQLString,
        },
        stateOfOrigin: {
          type: GraphQLString,
        },
        localGvt: {
          type: GraphQLString,
        },
        homeTown: {
          type: GraphQLString,
        },
        residence: {
          type: GraphQLString,
        },
        phone: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        const teacher = Staff.create({
          firstName: args.firstName,
          lastName: args.lastName,
          surname: args.surname,
          qualification: args.qualification,
          gender: args.gender,
          maritalStatus: args.maritalStatus,
          dob: args.dob,
          yearAdmitted: args.yearAdmitted,
          role: args.role,
          stateOfOrigin: args.stateOfOrigin,
          localGvt: args.localGvt,
          homeTown: args.homeTown,
          residence: args.residence,
          phone: args.phone,
          email: args.email,
        });

        return teacher;
      },
    },
    // Add Students
    addStudent: {
      type: StudentType,
      args: {
        firstName: {
          type: GraphQLString,
        },
        lastName: {
          type: GraphQLString,
        },
        surname: {
          type: GraphQLString,
        },
        dob: {
          type: GraphQLString,
        },
        yearAdmitted: {
          type: GraphQLString,
        },
        stateOfOrigin: {
          type: GraphQLString,
        },
        localGvt: {
          type: GraphQLString,
        },
        homeTown: {
          type: GraphQLString,
        },
        gender: {
          type: new GraphQLEnumType({
            name: 'GenderType',
            values: {
              Male: { value: 'Male' },
              Female: { value: 'Female' },
            },
          }),
        },
        level: {
          type: new GraphQLEnumType({
            name: 'ClassStatus',
            values: {
              Jss1: { value: 'Jss1' },
              Jss2: { value: 'Jss2' },
              Jss3: { value: 'Jss3' },
              Sss1: { value: 'Sss1' },
              Sss2: { value: 'Sss2' },
              Sss3: { value: 'Sss3' },
            },
          }),
          defaultValue: 'Jss1',
        },
        sponsorId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, args) {
        const student = Student.create({
          firstName: args.firstName,
          lastName: args.lastName,
          surname: args.surname,
          dob: args.dob,
          level: args.level,
          gender: args.gender,
          yearAdmitted: args.yearAdmitted,
          stateOfOrigin: args.stateOfOrigin,
          localGvt: args.localGvt,
          homeTown: args.homeTown,
          sponsorId: args.sponsorId,
        });

        return student;
      },
    },

    // Update Students
    updateStudent: {
      type: StudentType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
        firstName: {
          type: GraphQLString,
        },
        lastName: {
          type: GraphQLString,
        },
        surname: {
          type: GraphQLString,
        },
        dob: {
          type: GraphQLString,
        },
        yearAdmitted: {
          type: GraphQLString,
        },
        stateOfOrigin: {
          type: GraphQLString,
        },
        localGvt: {
          type: GraphQLString,
        },
        homeTown: {
          type: GraphQLString,
        },
        gender: {
          type: new GraphQLEnumType({
            name: 'GenderTypeUpdate',
            values: {
              Male: { value: 'Male' },
              Female: { value: 'Female' },
            },
          }),
        },
        level: {
          type: new GraphQLEnumType({
            name: 'ClassStatusUpdate',
            values: {
              Jss1: { value: 'Jss1' },
              Jss2: { value: 'Jss2' },
              Jss3: { value: 'Jss3' },
              Sss1: { value: 'Sss1' },
              Sss2: { value: 'Sss2' },
              Sss3: { value: 'Sss3' },
            },
          }),
          defaultValue: 'Jss1',
        },
        sponsorId: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        const updateStudent = Student.findByIdAndUpdate(
          args.id,
          {
            firstName: args.firstName,
            lastName: args.lastName,
            surname: args.surname,
            dob: args.dob,
            level: args.level,
            gender: args.gender,
            yearAdmitted: args.yearAdmitted,
            stateOfOrigin: args.stateOfOrigin,
            localGvt: args.localGvt,
            homeTown: args.homeTown,
            sponsorId: args.sponsorId,
          },
          {
            new: true,
          }
        );
        return updateStudent;
      },
    },

    // Delete Specific Class

    deleteClassStudent: {
      type: StudentType,
      args: {
        level: {
          type: new GraphQLEnumType({
            name: 'ClassStatusDelete',
            values: {
              Jss1: { value: 'Jss1' },
              Jss2: { value: 'Jss2' },
              Jss3: { value: 'Jss3' },
              Sss1: { value: 'Sss1' },
              Sss2: { value: 'Sss2' },
              Sss3: { value: 'Sss3' },
            },
          }),
        },
      },
      resolve(parent, args) {
        const deleteStudents = Student.deleteMany({ level: args.level });
        return deleteStudents.then((result) => result.deletedCount);
      },
    },

    // Delete Student
    deleteStudent: {
      type: StudentType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, args) {
        const deleteStudent = Student.findByIdAndRemove(args.id);
        return deleteStudent;
      },
    },

    // Add Sponsor
    addSponsor: {
      type: SponsorType,
      args: {
        name: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        occupation: { type: GraphQLString },
        relationship: { type: GraphQLString },
        address: { type: GraphQLString },
        studentIds: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        const sponsor = Sponsor.create({
          name: args.name,
          phoneNumber: args.phoneNumber,
          occupation: args.occupation,
          relationship: args.relationship,
          address: args.address,
          studentIds: args.studentIds,
        });

        return sponsor;
      },
    },

    updateSponsor: {
      type: SponsorType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        occupation: { type: GraphQLString },
        relationship: { type: GraphQLString },
        address: { type: GraphQLString },
        studentIds: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        const updateSponsor = Sponsor.findByIdAndUpdate(args.id, {
          name: args.name,
          phoneNumber: args.phoneNumber,
          occupation: args.occupation,
          relationship: args.relationship,
          address: args.address,
          studentIds: args.studentIds,
        });
        return updateSponsor;
      },
    },
  },
});

// Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Get all Students
    students: {
      type: new GraphQLList(StudentType),
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        const StudentList = Student.find();
        return StudentList;
      },
    },

    // Get specific Student
    studentDetails: {
      type: StudentType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, args) {
        const StudentInfo = Student.findById(args.id);
        return StudentInfo;
      },
    },

    Sponsors: {
      type: new GraphQLList(SponsorType),
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        const sponsors = Sponsor.find();
        return sponsors;
      },
    },

    // Get all Teachers
    staff: {
      type: new GraphQLList(StaffType),
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        const staffList = Staff.find();
        return staffList;
      },
    },

    // Get a Staff
    staffDetail: {
      type: StaffType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, args) {
        const staff = Staff.findById(args.id);
        return staff;
      },
    },

    // Get All Users
    users: {
      type: GraphQLList(UserType),
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        const users = User.find();
        return users;
      },
    },
    // Get Specific User
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, args) {
        const user = User.findOne(args.id);
        return user;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
