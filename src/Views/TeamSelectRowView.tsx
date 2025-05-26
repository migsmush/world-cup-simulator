import { View, Text } from "react-native";

type TeamSelectRowViewProps = {
    teamName: string;
    teamRank: string;
};

const TeamSelectRowView = ({teamName, teamRank}: TeamSelectRowViewProps) => {
    return (
        <View>
            <Text>{teamName} {teamRank}</Text>
        </View>
    );
};

export { TeamSelectRowView };
