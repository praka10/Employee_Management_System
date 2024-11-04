const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  empId: { type: Number, required: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  status: { type: String, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
