import { useEffect, useState } from "react";
import { View, TextInput, FlatList } from "react-native";
import { fetchRankingOverview } from "../api";
import { TeamSelectRowView } from "./TeamSelectRowView";
import type { RankingData } from "../types/types";

const TeamSelectView = () => {
  const [teamSearchText, setTeamSearchText] = useState("");
  const [teamList, setTeamList] = useState([] as RankingData[]);
  const [fullTeamList, setFullTeamList] = useState([] as RankingData[]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetchRankingOverview();
        console.log(res);
        const teams = res.rankings;
        console.log(res);
        setTeamList(teams);
        setFullTeamList(teams);
      } catch (e) {
        console.error("error while fetching rank overview", e);
      }
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    console.log(teamSearchText);
    if (teamSearchText !== "") {
      const newTeams = fullTeamList.filter((rankData) =>
        rankData.rankingItem.name.includes(teamSearchText),
      );
      setTeamList(newTeams);
    } else {
      setTeamList(fullTeamList);
    }
  }, [teamSearchText]);

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="enter a team name"
        onChangeText={setTeamSearchText}
        value={teamSearchText}
      />
      <FlatList
        data={teamList}
        renderItem={({ item }) => (
          <TeamSelectRowView
            teamName={item.rankingItem.name}
            teamRank={String(item.rankingItem.rank)}
          />
        )}
        keyExtractor={(item) => item.rankingItem.idTeam}
      />
    </View>
  );
};

export { TeamSelectView };
