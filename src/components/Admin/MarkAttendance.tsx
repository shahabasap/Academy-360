import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import ApiController from '../../Api/apiCalls';
import { useSelector } from 'react-redux';
import { selectTeacherClass } from '../../features/teacher/teacherSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';
import ConfirmationModal from '../common/ConfirmationModal2';

// Styled components for a standardized look
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#8890d1',
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type Attendance = {
  _id?: string;
  classroomId?: string;
};

export default function CustomizedTables() {
  const classroom = useSelector(selectTeacherClass);
  const classroomId = classroom?._id || '';
  
  const [attendance, setAttendance] = useState<Attendance|null>();
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(''); // Track the ID of the student being updated
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch Attendance Data
  const fetchAttendance = async () => {
    setLoading(true);
    setError(''); // Reset any previous errors
    try {
      const response = await ApiController.DayAttendance(classroomId);
    
      setAttendance(response.data);
      setAttendanceList(response.data.AttedenceDataSet || []); // Set the fetched data to state
    } catch (err) {
      setAttendanceList([])
      setAttendance(null)
      console.error('Fetch Attendance Error:', err);
      setError('Something went wrong while fetching attendance data.');
      toast.error('Error fetching attendance data');
    } finally {
      setLoading(false);
    }
  };

  // Handle attendance action button click (show modal)
  const handleAttendance = (studentId: string) => {
    setUpdatingId(studentId);
    setIsModalOpen(true);
  };

  // Cancel action in modal
  const cancelAttendance = () => {
    setIsModalOpen(false);
    setUpdatingId(''); // Clear updating state
  };

  // Confirm attendance status change and call API
  const confirmAttendance = async (studentId: string) => {
    setIsModalOpen(false); // Close modal
    setError(''); // Reset any previous errors
    try {
      const classroomId = attendance?.classroomId;
      const attendanceListId = attendance?._id;

      if (classroomId && attendanceListId) {
        // API call to update attendance
        await ApiController.UpdateAttendance(classroomId, attendanceListId, studentId);
        toast.success('Attendance updated successfully');
        fetchAttendance(); // Refresh data after update
      } else {
        throw new Error('Missing classroomId or attendanceListId');
      }
    } catch (err) {
      console.error('Update Attendance Error:', err);
      setError('Something went wrong while updating attendance.');
      toast.error('Error updating attendance');
    } finally {
      setUpdatingId(''); // Reset the updating state
    }
  };

  useEffect(() => {
    if (classroomId) {
      fetchAttendance();
    }
  }, [classroomId]);

  // Handle Loading State
  if (loading) {
    return (
      <Container sx={{ paddingTop: '20px', textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  // Handle Error State
  if (error) {
    return (
      <Container sx={{ paddingTop: '20px' }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  // Display "Students not in the classroom" message if attendanceList is empty
  if (!attendanceList.length) {
    return (
      <Container sx={{ paddingTop: '40px', paddingBottom: '40px', textAlign: 'center' }}>
        <Paper elevation={3} sx={{ padding: '24px', maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ marginBottom: '16px' }}>Students not in the classroom</h2>
          <p style={{ fontSize: '18px', color: '#666' }}>No students are currently attending this class.</p>
        </Paper>
      </Container>
    );
  }

  return (
    <Container sx={{ paddingTop: '20px' }}>
      <TableContainer component={Paper} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Username</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceList.map((ele: any) => (
              <StyledTableRow key={ele._id}>
                <StyledTableCell component="th" scope="row">
                  {ele.studentId ? ele.studentId.name : 'N/A'}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {ele.studentId ? ele.studentId.username : 'N/A'}
                </StyledTableCell>
                <StyledTableCell align="center">{ele.status}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    color={ele.status === 'Absent' ? 'error' : 'primary'}
                    disabled={updatingId === ele.studentId?._id} // Disable button while updating
                    onClick={() => handleAttendance(ele.studentId?._id)}
                  >
                    {ele.status === 'Absent' ? 'Mark Present' : 'Mark Absent'}
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={cancelAttendance}
        onConfirm={() => confirmAttendance(updatingId)} // Confirm with the updatingId
      />
    </Container>
  );
}
