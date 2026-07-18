// Usage:
// <SearchForm onSearch={(filters) => console.log(filters)} />
// <SearchForm onSearch={handleSearch} onReset={() => setResults(allData)} />
//
// Requires: @mui/material @emotion/react @emotion/styled

import { useState, type ChangeEvent, type FormEvent } from "react"
import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  InputAdornment,
  type SelectChangeEvent,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

export type SearchFilters = {
  keyword: string
  category: string
  status: string
  dateFrom: string
  dateTo: string
  tags: string[]
}

const DEFAULT_FILTERS: SearchFilters = {
  keyword: "",
  category: "",
  status: "",
  dateFrom: "",
  dateTo: "",
  tags: [],
}

const CATEGORY_OPTIONS = [
  { value: "web",     label: "Web開発" },
  { value: "mobile",  label: "モバイル" },
  { value: "design",  label: "デザイン" },
  { value: "backend", label: "バックエンド" },
]

const STATUS_OPTIONS = [
  { value: "active",  label: "進行中" },
  { value: "pending", label: "保留中" },
  { value: "closed",  label: "完了" },
]

const TAG_OPTIONS = [
  { value: "react",      label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "nextjs",     label: "Next.js" },
  { value: "tailwind",   label: "Tailwind" },
  { value: "nodejs",     label: "Node.js" },
]

type Props = {
  onSearch: (filters: SearchFilters) => void
  onReset?: () => void
}

export function SearchForm({ onSearch, onReset }: Props) {
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS)

  const set = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) =>
    setFilters((prev: SearchFilters) => ({ ...prev, [key]: value }))

  const toggleTag = (tag: string) =>
    setFilters((prev: SearchFilters) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t: string) => t !== tag)
        : [...prev.tags, tag],
    }))

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS)
    onReset?.()
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(filters)
  }

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ mb: 2, textTransform: "uppercase", letterSpacing: 1 }}
      >
        検索条件
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>

          {/* Keyword */}
          <TextField
            label="キーワード"
            size="small"
            fullWidth
            value={filters.keyword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => set("keyword", e.target.value)}
            placeholder="案件名・キーワードで検索..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18, color: "text.disabled" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Category + Status */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="category-label">カテゴリ</InputLabel>
              <Select
                labelId="category-label"
                label="カテゴリ"
                value={filters.category}
                onChange={(e: SelectChangeEvent) => set("category", e.target.value)}
              >
                <MenuItem value=""><em>すべて</em></MenuItem>
                {CATEGORY_OPTIONS.map((o) => (
                  <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel id="status-label">ステータス</InputLabel>
              <Select
                labelId="status-label"
                label="ステータス"
                value={filters.status}
                onChange={(e: SelectChangeEvent) => set("status", e.target.value)}
              >
                <MenuItem value=""><em>すべて</em></MenuItem>
                {STATUS_OPTIONS.map((o) => (
                  <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Date range */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 1, alignItems: "center" }}>
            <TextField
              label="開始日"
              type="date"
              size="small"
              fullWidth
              value={filters.dateFrom}
              onChange={(e: ChangeEvent<HTMLInputElement>) => set("dateFrom", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <Typography color="text.secondary" sx={{ px: 0.5 }}>〜</Typography>
            <TextField
              label="終了日"
              type="date"
              size="small"
              fullWidth
              value={filters.dateTo}
              inputProps={{ min: filters.dateFrom || undefined }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => set("dateTo", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Tags */}
          <Box>
            <Typography
              component="legend"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              タグ
            </Typography>
            <FormGroup row>
              {TAG_OPTIONS.map((tag) => (
                <FormControlLabel
                  key={tag.value}
                  control={
                    <Checkbox
                      size="small"
                      checked={filters.tags.includes(tag.value)}
                      onChange={() => toggleTag(tag.value)}
                    />
                  }
                  label={<Typography variant="body2">{tag.label}</Typography>}
                />
              ))}
            </FormGroup>
          </Box>

          <Divider />

          {/* Actions */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button variant="outlined" color="inherit" onClick={handleReset}>
              リセット
            </Button>
            <Button type="submit" variant="contained" disableElevation>
              検索
            </Button>
          </Box>

        </Stack>
      </Box>
    </Paper>
  )
}
