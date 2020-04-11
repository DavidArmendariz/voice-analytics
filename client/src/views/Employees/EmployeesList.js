import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectEmployeesAsTable } from "../../redux/employees/employees.selectors";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const EmployeesList = ({ employees }) => {
  const classes = useStyles();

  return (
    employees && (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>UID</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map(row => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.uid}</TableCell>
                <TableCell>{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};

const mapStateToProps = createStructuredSelector({
  employees: selectEmployeesAsTable
});

export default connect(mapStateToProps)(EmployeesList);
