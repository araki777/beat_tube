import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Burger,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { fetchSearchList, fetchSuggestion } from "./Api";
import { useState } from "react";
import { useDebounce } from "react-use";
import PropType from "prop-types";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: rem(56),
    display: "flex",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
    Input: {
      width: 400,
    },
    marginLeft: 10,
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

export function HeaderSearch({ setSearchResults }) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggest, setSuggest] = useState([]);

  // 検索を1秒遅くする(APIの多重実行防止)
  useDebounce(
    async () => {
      // 検索内容がある場合
      if (searchTerm) {
        // サジェストを取得
        const results = await fetchSuggestion(searchTerm);
        if (results) {
          // 検索結果
          setSuggest(results);
        }
      }
    },
    1000,
    [searchTerm]
  );

  // 検索アイテムを押した時の挙動
  const handleSubmitSearch = async (item) => {
    // 検索
    const results = await fetchSearchList(item);
    if (results) {
      // // 検索結果を親のステートに渡す
      setSearchResults(results);
    }
  };

  // キーが押された時の挙動
  const handleKeyDownSearch = async (e) => {
    // Enterキーが押された場合かつ検索内容がある場合
    if (e.keyCode == 13 && searchTerm != "") {
      // 検索
      const results = await fetchSearchList(searchTerm);
      if (results) {
        // 検索結果を親のステートに渡す
        setSearchResults(results);
      }
    }
  };

  const items = "";

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" />
        </Group>

        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size="1rem" stroke={1.5} />}
            data={suggest.map((result) => result.snippet.title)}
            onChange={setSearchTerm}
            limit={10}
            key="autocomplete"
            onItemSubmit={(item) => {
              handleSubmitSearch(item);
            }}
            onKeyDown={(e) => {
              handleKeyDownSearch(e);
            }}
          />
        </Group>
      </div>
    </Header>
  );
}

HeaderSearch.propTypes = {
  setSearchResults: PropType.func.isRequired,
};
