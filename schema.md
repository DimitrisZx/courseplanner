student:
  name: string
  semester: int
  lessonsRegistered: {}
    currentSemester: lesson[]
    previousSemesters: lesson[]
  username: string
  email: string
  studentID: string

lesson:  {}
  name: string => {{name}}-{{Θ||Ε}} eg 'Κώδικες-Θ' / 'Κώδικες-Ε'
  day: 'Δευτέρα | Τρίτη | Τετάρτη | Πέμπτη | Παρασκευή',
  hours: 08:00 - 21:00,
  semester: number,
  type: 'theory' | 'workshop'
