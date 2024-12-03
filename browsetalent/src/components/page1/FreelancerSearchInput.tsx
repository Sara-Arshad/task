import React, { useState, useEffect } from "react";
import { Freelancer } from "../../redux/slices/freelauncerSlice";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { InputAdornment } from "@mui/material";
import Search from "@mui/icons-material/Search";

interface FreelancerSearchInputProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredFreelancers: Freelancer[];
  setFilteredFreelancers: React.Dispatch<React.SetStateAction<Freelancer[]>>;
  isFreelancersLoading: boolean;
  freelancersError: boolean;
  freelancers: Freelancer[];
}

const FreelancerSearchInput: React.FC<FreelancerSearchInputProps> = ({
  query,
  setQuery,
  filteredFreelancers,
  setFilteredFreelancers,
  isFreelancersLoading,
  freelancersError,
  freelancers,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = freelancers.filter((freelancer) => {
        const nameMatch = freelancer.name
          .toLowerCase()
          .includes(lowerCaseQuery);
        const skillsMatch = freelancer.skills.some((skill) =>
          skill.toLowerCase().includes(lowerCaseQuery)
        );
        const locationMatch = freelancer.location
          .toLowerCase()
          .includes(lowerCaseQuery);
        return nameMatch || skillsMatch || locationMatch;
      });

      setFilteredFreelancers(filtered);
      setOpen(filtered.length > 0);
    } else {
      setFilteredFreelancers([]);
      setOpen(false);
    }
  }, [query, freelancers, setFilteredFreelancers]);

  const handleSelect = (freelancer: Freelancer) => {
    setQuery(freelancer.name);
    setFilteredFreelancers([]);
    setOpen(false);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <TextField
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for freelancers..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
          />
          {open && (
            <Paper
              className="absolute left-0 top-full w-full z-10"
              style={{
                maxHeight: 200,
                overflowY: "auto",
              }}
            >
              {isFreelancersLoading ? (
                <p className="text-gray-500 p-4">Loading...</p>
              ) : freelancersError ? (
                <p className="text-red-500 p-4">
                  Failed to load freelancers. Please try again.
                </p>
              ) : (
                <List>
                  {filteredFreelancers.map((freelancer, index) => (
                    <ListItem
                      onClick={() => handleSelect(freelancer)}
                      key={freelancer.id || index}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={freelancer.profilePicture}
                          alt={freelancer.name}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={freelancer.name}
                        secondary={`$${freelancer.hourlyRate}/hr • ${freelancer.location}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          )}
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default FreelancerSearchInput;
