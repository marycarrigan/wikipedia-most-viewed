
import renderer from 'react-test-renderer';
import React from "react";
import { ArticleCard, ArticleCards, MoreInfoDialog, App} from "../components";

it('renders article card', () => {
  const result = {
    rank: 1,
    article: "Test_Article",
    views: 100,
  };

  const component = renderer.create(
    <ArticleCard result={result} onMoreInfo={() => {}} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders article cards with results', () => {
  const result = {
    rank: 1,
    article: "Test_Article",
    views: 100,
  };

  const component = renderer.create(
    <ArticleCards articles={[result]} onMoreInfo={() => {}} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders article cards without results', () => {
  const component = renderer.create(
    <ArticleCards articles={[]} onMoreInfo={() => {}} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders article cards loading', () => {
  const component = renderer.create(
    <ArticleCards articles={[]} loading onMoreInfo={() => {}} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});