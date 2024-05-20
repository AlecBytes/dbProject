WITH HR_Percentiles AS (
    SELECT
        year,
        FLOOR(PERCENTILE_CONT(:percentile) WITHIN GROUP (ORDER BY HR)) AS HR_95thPercentile
    FROM battingseason
    WHERE 
        year >= :startYear AND
        year <= :endYear
    GROUP BY year
),
Top5PercentHRPlayers AS (
    SELECT
        bs.player_id,
        bs.year
    FROM battingseason bs
    JOIN HR_Percentiles p ON bs.year = p.year
    WHERE 
        bs.HR >= p.HR_95thPercentile AND 
        bs.year >= :startYear AND
        bs.year <= :endYear
),
PostSeasonPlayersTop5 AS (
    SELECT
        bs_top5.player_id,
        bs_top5.year
    FROM Top5PercentHRPlayers bs_top5
    JOIN battingpostseason bp ON bs_top5.player_id = bp.player_id AND bs_top5.year = bp.year
),
PostSeasonPlayers AS (
    SELECT DISTINCT
      bs.player_id,
      bs.year
    FROM
      battingseason bs
    JOIN battingpostseason bp ON bs.player_id = bp.player_id AND bs.year = bp.year
),
AllPlayers AS (
    SELECT DISTINCT
      bs.player_id,
      bs.year
    FROM
      battingseason bs
),
Top5PercentageInPost AS (
    SELECT
        p.year,
        ROUND(COUNT(DISTINCT pp.player_id) * 100.0 / NULLIF(COUNT(DISTINCT tp.player_id), 0), 2) AS top5_percentage_in_postseason
    FROM
        HR_Percentiles p
    LEFT JOIN
        Top5PercentHRPlayers tp ON p.year = tp.year
    LEFT JOIN
        PostSeasonPlayersTop5 pp ON tp.player_id = pp.player_id AND tp.year = pp.year
    GROUP BY
        p.year
),
AllPercentageInPost AS (
    SELECT
        p.year,
        ROUND(COUNT(DISTINCT pp.player_id) * 100.0 / NULLIF(COUNT(DISTINCT ap.player_id), 0), 2) AS percentage_of_all_in_postseason
    FROM
        HR_Percentiles p
    LEFT JOIN
        AllPlayers ap ON p.year = ap.year
    LEFT JOIN
        PostSeasonPlayers pp ON ap.player_id = pp.player_id AND ap.year = pp.year
    GROUP BY
        p.year
    ORDER BY
        year
)
SELECT 
    Top5PercentageInPost.year AS year,
    Top5PercentageInPost.top5_percentage_in_postseason AS top5_percentage_in_postseason,
    AllPercentageInPost.percentage_of_all_in_postseason AS percentage_of_all_in_postseason
FROM Top5PercentageInPost
JOIN AllPercentageInPost ON Top5PercentageInPost.year = AllPercentageInPost.year
